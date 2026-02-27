/* ============================================
   AXON. — 3D Viewers
   FootViewer (Stage 1) + ShoeViewer (Stage 4)
   ============================================ */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

const SIGNAL = new THREE.Color(0xE94520);
const BONE   = new THREE.Color(0xE8E0D4);
const VOID_BG = new THREE.Color(0x1a1a1a);

/* ============================================
   FOOT VIEWER — Parametric 3D foot
   ============================================ */

export class FootViewer {
    constructor(container) {
        this.container = container;
        this.width = container.clientWidth || 600;
        this.height = container.clientHeight || 500;
        this.footModel = null;
        this.baseScale = null;

        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = VOID_BG;

        // Camera
        this.camera = new THREE.PerspectiveCamera(35, this.width / this.height, 0.01, 100);
        this.camera.position.set(0, 0.3, 0.6);
        this.camera.lookAt(0, 0, 0);

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(this.renderer.domElement);

        // Controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.enablePan = false;
        this.controls.minDistance = 0.2;
        this.controls.maxDistance = 2.0;
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = 1.5;
        this.controls.target.set(0, 0, 0);

        // Lights
        this.scene.add(new THREE.AmbientLight(0xffffff, 0.5));
        const key = new THREE.DirectionalLight(0xffffff, 0.9);
        key.position.set(2, 3, 2);
        this.scene.add(key);
        const fill = new THREE.DirectionalLight(0xffffff, 0.3);
        fill.position.set(-2, 1, -2);
        this.scene.add(fill);
        const rim = new THREE.DirectionalLight(0x8888ff, 0.25);
        rim.position.set(0, -1, -2);
        this.scene.add(rim);

        // Floor grid
        const grid = new THREE.GridHelper(1, 20, 0x2a2a30, 0x2a2a30);
        grid.position.y = -0.2;
        this.scene.add(grid);

        // Wireframe overlay group
        this.wireGroup = new THREE.Group();
        this.scene.add(this.wireGroup);

        // Load OBJ model
        this.loadModel();

        // Resize
        this._onResize = () => this.resize();
        window.addEventListener('resize', this._onResize);

        // Animate
        this._raf = null;
        this.animate();
    }

    loadModel() {
        const objLoader = new OBJLoader();
        objLoader.load('models/F1P1D0V1feet.obj',
            (obj) => { this.onModelLoaded(obj); },
            (xhr) => { console.log('Foot: ' + Math.round(xhr.loaded / xhr.total * 100) + '%'); },
            (err) => { console.error('OBJ load error:', err); }
        );
    }

    onModelLoaded(obj) {
        // Center geometry at origin
        const box = new THREE.Box3().setFromObject(obj);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);

        // Normalize to ~0.4 unit size
        const scale = 0.4 / maxDim;

        // Move geometry so center is at origin
        obj.traverse(child => {
            if (child.isMesh) {
                child.geometry.translate(-center.x, -center.y, -center.z);
            }
        });

        // Apply AXON. material
        const footMat = new THREE.MeshPhysicalMaterial({
            color: 0xd4b5a0,
            roughness: 0.65,
            metalness: 0.05,
            clearcoat: 0.15,
            transparent: true,
            opacity: 0.9,
            side: THREE.DoubleSide
        });

        obj.traverse(child => {
            if (child.isMesh) {
                child.material = footMat;

                // Wireframe overlay
                const wireGeo = child.geometry.clone();
                const wireMesh = new THREE.Mesh(wireGeo, new THREE.MeshBasicMaterial({
                    color: 0xE94520, wireframe: true, transparent: true, opacity: 0.06
                }));
                this.wireGroup.add(wireMesh);
            }
        });

        obj.scale.setScalar(scale);
        obj.rotation.x = -Math.PI / 2;
        this.wireGroup.scale.setScalar(scale);
        this.wireGroup.rotation.x = -Math.PI / 2;

        this.footModel = obj;
        this.baseScale = scale;
        this.scene.add(obj);

        console.log('Foot loaded. Size:', size, 'Scale:', scale);
    }

    update(profile) {
        if (!this.footModel || !this.baseScale) return;

        const g = profile.geometry;
        // Scale relative to defaults
        const lenScale = g.footLength / 265;
        const widScale = g.footWidth / 100;
        const archMap = { low: 0.92, medium: 1.0, high: 1.08 };
        const archScale = archMap[g.archHeight] || 1.0;

        // After -90° X rotation: model Y→depth(width), model Z→vertical(arch)
        this.footModel.scale.set(
            this.baseScale * lenScale,
            this.baseScale * widScale,
            this.baseScale * archScale
        );
        this.wireGroup.scale.copy(this.footModel.scale);
    }

    animate() {
        this._raf = requestAnimationFrame(() => this.animate());
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    resize() {
        this.width = this.container.clientWidth || 600;
        this.height = this.container.clientHeight || 500;
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.width, this.height);
    }

    dispose() {
        if (this._raf) cancelAnimationFrame(this._raf);
        window.removeEventListener('resize', this._onResize);
        this.controls.dispose();
        this.renderer.dispose();
        this.container.innerHTML = '';
    }
}

/* ============================================
   SHOE VIEWER — 3D shoe for Stage 4
   ============================================ */

const COLORWAYS = {
    void:    { main: 0x1a1a1e, accent: 0x2a2a30, upper: 0x222228, sole: 0x111115 },
    bone:    { main: 0xE8E0D4, accent: 0xD4C9B8, upper: 0xF0EAE0, sole: 0xCFC4B4 },
    signal:  { main: 0xE94520, accent: 0xC9371A, upper: 0xF05535, sole: 0xB83218 },
    glacier: { main: 0x4A9CC7, accent: 0x3788B5, upper: 0x8BBCD4, sole: 0x2A7AAF },
    moss:    { main: 0x7A8B6F, accent: 0x5E6B52, upper: 0x8FA07E, sole: 0x4D5A42 },
    slate:   { main: 0x6B7B8D, accent: 0x516272, upper: 0x7E8E9E, sole: 0x455564 },
    khaki:   { main: 0x8B7D5A, accent: 0x6B5F3E, upper: 0xA89878, sole: 0x5C4E33 }
};

export class ShoeViewer {
    constructor(container) {
        this.container = container;
        this.width = container.clientWidth || 600;
        this.height = container.clientHeight || 500;
        this.wireframe = false;
        this.exploded = false;
        this.explodeProgress = 0;
        this.colorway = 'bone';
        this.layers = {};
        this.labelSprites = [];
        this.currentSpec = null;
        this.shoeModel = null;
        this.wireOverlay = null;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1a1a1a);

        this.camera = new THREE.PerspectiveCamera(30, this.width / this.height, 0.1, 100);
        this.camera.position.set(0.45, 0.3, 0.45);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(this.renderer.domElement);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.enablePan = false;
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = 1.0;

        // Lights
        this.scene.add(new THREE.AmbientLight(0xffffff, 0.6));
        const key = new THREE.DirectionalLight(0xffffff, 1.0);
        key.position.set(3, 4, 2);
        this.scene.add(key);
        const fill = new THREE.DirectionalLight(0xffffff, 0.4);
        fill.position.set(-2, 2, -1);
        this.scene.add(fill);
        const rim = new THREE.DirectionalLight(0xaaaaff, 0.3);
        rim.position.set(0, -1, -3);
        this.scene.add(rim);

        // Floor
        const grid = new THREE.GridHelper(1, 20, 0x2a2a30, 0x2a2a30);
        grid.position.y = -0.15;
        this.scene.add(grid);

        this.shoeGroup = new THREE.Group();
        this.scene.add(this.shoeGroup);

        this._onResize = () => this.resize();
        window.addEventListener('resize', this._onResize);
        this._raf = null;

        // Load OBJ model
        this._modelLoaded = false;
        this._pendingSpec = null;
        this._currentOBJ = null; // track which OBJ is loaded

        this.animateLoop();
    }

    _loadOBJ(purpose) {
        const objMap = {
            racing: 'models/racing_light.obj',
            longdist: 'models/longdist_light.obj',
            beginner: 'models/beginner_light.obj',
            _default: 'models/racing_light.obj'
        };
        const objFile = objMap[purpose] || objMap._default;

        // Skip if same model already loaded
        if (this._currentOBJ === objFile && this._modelLoaded) return;
        this._currentOBJ = objFile;
        this._modelLoaded = false;

        // Clear existing model
        this.shoeGroup.clear();
        this.shoeModel = null;
        this.wireOverlay = null;
        // Show loading overlay
        this._statusEl = document.createElement('div');
        this._statusEl.style.cssText = 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:#E94520;font:12px IBM Plex Mono,monospace;z-index:10;text-align:center;';
        this._statusEl.textContent = 'Loading 3D model...';
        this.container.style.position = 'relative';
        this.container.appendChild(this._statusEl);

        const loader = new OBJLoader();
        console.log('ShoeViewer: loading', objFile);
        loader.load(
            objFile,
            (obj) => {
                try {
                    // Center and normalize
                    const box = new THREE.Box3().setFromObject(obj);
                    const center = box.getCenter(new THREE.Vector3());
                    const size = box.getSize(new THREE.Vector3());
                    const maxDim = Math.max(size.x, size.y, size.z);
                    const scale = 0.35 / maxDim;

                    obj.traverse(child => {
                        if (child.isMesh) {
                            child.geometry.translate(-center.x, -center.y, -center.z);
                            // Delete old normals and recompute
                            child.geometry.deleteAttribute('normal');
                            child.geometry.computeVertexNormals();
                        }
                    });

                    // Apply gradient material
                    const cw = COLORWAYS[this.colorway] || COLORWAYS.void;
                    this._applyGradient(obj, cw);

                    obj.scale.setScalar(scale);
                    this.shoeModel = obj;
                    this.shoeGroup.add(obj);

                    // Wireframe overlay
                    const wireGroup = new THREE.Group();
                    obj.traverse(child => {
                        if (child.isMesh) {
                            const wireMesh = new THREE.Mesh(
                                child.geometry,
                                new THREE.MeshBasicMaterial({
                                    color: 0xE94520, wireframe: true, transparent: true, opacity: 0.06
                                })
                            );
                            wireGroup.add(wireMesh);
                        }
                    });
                    wireGroup.scale.setScalar(scale);
                    this.wireOverlay = wireGroup;
                    this.shoeGroup.add(wireGroup);

                    this._modelLoaded = true;
                    if (this._statusEl) this._statusEl.remove();
                    console.log('ShoeViewer: OBJ loaded.', Math.round(size.x * 1000) + 'x' + Math.round(size.y * 1000) + 'x' + Math.round(size.z * 1000) + 'mm, scale=' + scale.toFixed(4));

                    // Apply queued spec if buildShoe was called before load finished
                    if (this._pendingSpec) {
                        this.buildShoe(this._pendingSpec);
                        this._pendingSpec = null;
                    }
                } catch (e) {
                    console.error('ShoeViewer: error processing OBJ:', e);
                    if (this._statusEl) this._statusEl.textContent = 'Error: ' + e.message;
                }
            },
            (xhr) => {
                if (xhr.total) {
                    const pct = Math.round(xhr.loaded / xhr.total * 100);
                    console.log('Shoe: ' + pct + '%');
                    if (this._statusEl) this._statusEl.textContent = 'Loading model... ' + pct + '%';
                } else if (xhr.loaded) {
                    const mb = (xhr.loaded / 1048576).toFixed(1);
                    if (this._statusEl) this._statusEl.textContent = 'Loading model... ' + mb + ' MB';
                }
            },
            (err) => {
                console.error('Shoe OBJ load error:', err);
                if (this._statusEl) this._statusEl.textContent = 'Load failed: ' + (err.message || err);
            }
        );
    }

    _applyGradient(obj, cw) {
        const colorBot = new THREE.Color(cw.main);
        const colorTop = new THREE.Color(0xffffff); // white at top

        obj.traverse(child => {
            if (!child.isMesh) return;
            const geo = child.geometry;
            const pos = geo.attributes.position;
            let yMin = Infinity, yMax = -Infinity;
            for (let i = 0; i < pos.count; i++) {
                const y = pos.getY(i);
                if (y < yMin) yMin = y;
                if (y > yMax) yMax = y;
            }
            const yRange = yMax - yMin || 1;
            const colors = new Float32Array(pos.count * 3);
            const tmp = new THREE.Color();
            for (let i = 0; i < pos.count; i++) {
                const t = (pos.getY(i) - yMin) / yRange; // 0=bottom, 1=top
                tmp.lerpColors(colorBot, colorTop, t);
                colors[i * 3] = tmp.r;
                colors[i * 3 + 1] = tmp.g;
                colors[i * 3 + 2] = tmp.b;
            }
            geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

            child.material = new THREE.MeshPhysicalMaterial({
                vertexColors: true,
                roughness: 0.45,
                metalness: 0.08,
                clearcoat: 0.3,
                flatShading: true,
                wireframe: this.wireframe || false,
                side: THREE.DoubleSide
            });
        });
    }

    buildShoe(spec) {
        this.currentSpec = spec;
        const purpose = spec.profile?.load?.activityType || 'training';

        // If purpose changed, reload the correct OBJ
        const objMap = {
            racing: 'models/racing_light.obj',
            longdist: 'models/longdist_light.obj',
            beginner: 'models/beginner_light.obj',
            _default: 'models/racing_light.obj'
        };
        const needed = objMap[purpose] || objMap._default;
        if (this._currentOBJ !== needed) {
            this._pendingSpec = spec;
            this._loadOBJ(purpose);
            return;
        }

        if (!this._modelLoaded) {
            this._pendingSpec = spec;
            if (!this._currentOBJ) this._loadOBJ(purpose);
            return;
        }
        const cw = COLORWAYS[this.colorway] || COLORWAYS.void;
        if (this.shoeModel) {
            this._applyGradient(this.shoeModel, cw);
        }
    }

    toggleExplode() {
        this.exploded = !this.exploded;
        return this.exploded;
    }

    toggleWireframe() {
        this.wireframe = !this.wireframe;
        if (this.shoeModel) {
            this.shoeModel.traverse(child => {
                if (child.isMesh) child.material.wireframe = this.wireframe;
            });
        }
        // Toggle signal wireframe overlay visibility
        if (this.wireOverlay) {
            this.wireOverlay.visible = !this.wireframe; // hide overlay when in full wireframe mode
        }
        return this.wireframe;
    }

    setColorway(name) {
        this.colorway = name;
        if (this.currentSpec) this.buildShoe(this.currentSpec);
    }

    animateLoop() {
        this._raf = requestAnimationFrame(() => this.animateLoop());
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    resize() {
        this.width = this.container.clientWidth || 600;
        this.height = this.container.clientHeight || 500;
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.width, this.height);
    }

    dispose() {
        if (this._raf) cancelAnimationFrame(this._raf);
        window.removeEventListener('resize', this._onResize);
        this.controls.dispose();
        this.renderer.dispose();
        this.container.innerHTML = '';
    }
}
