"""
AXON. — Local dev server with image save endpoint
Run: python3 server.py
"""
from http.server import HTTPServer, SimpleHTTPRequestHandler
import json, os, urllib.request, ssl, base64

class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.startswith('/list-refs/'):
            try:
                purpose = self.path.split('/list-refs/')[1]
                folder = f'reference_shoes/{purpose}'
                files = sorted(os.listdir(folder)) if os.path.isdir(folder) else []
                files = [f for f in files if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))]
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'files': files}).encode())
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': str(e)}).encode())
            return

        if self.path == '/list-generated':
            try:
                folder = 'generated'
                files = sorted(os.listdir(folder)) if os.path.isdir(folder) else []
                files = [f for f in files if f.endswith(('.png', '.jpg', '.jpeg', '.webp'))]
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'files': files}).encode())
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': str(e)}).encode())
            return
        super().do_GET()

    def do_POST(self):
        if self.path == '/save-image':
            try:
                length = int(self.headers['Content-Length'])
                body = json.loads(self.rfile.read(length))
                url = body['url']
                filename = body['filename']

                os.makedirs('generated', exist_ok=True)
                filepath = f'generated/{filename}'

                # Download image from DALL-E URL
                ctx = ssl.create_default_context()
                req = urllib.request.Request(url, headers={'User-Agent': 'AXON/1.0'})
                with urllib.request.urlopen(req, context=ctx) as resp:
                    with open(filepath, 'wb') as f:
                        f.write(resp.read())

                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'saved': filepath, 'ok': True}).encode())
                print(f'  → Saved: {filepath}')
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': str(e)}).encode())
                print(f'  → Error: {e}')
            return

        if self.path == '/save-b64':
            try:
                length = int(self.headers['Content-Length'])
                body = json.loads(self.rfile.read(length))
                b64data = body['b64']
                filename = body['filename']

                os.makedirs('generated', exist_ok=True)
                filepath = f'generated/{filename}'

                with open(filepath, 'wb') as f:
                    f.write(base64.b64decode(b64data))

                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'saved': filepath, 'ok': True}).encode())
                print(f'  → Saved: {filepath}')
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': str(e)}).encode())
            return

        self.send_response(404)
        self.end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

print('AXON. customize server → http://localhost:3003')
print('Generated images → ./generated/')
HTTPServer(('', 3003), Handler).serve_forever()
