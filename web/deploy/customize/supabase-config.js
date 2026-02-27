/* ============================================
   AXON. — Supabase Storage Config
   Replace with your Supabase project credentials
   ============================================ */

const SUPABASE_URL = 'https://fvhkvrwcbvrdmekjxmzf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2aGt2cndjYnZyZG1la2p4bXpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyMDA3MDMsImV4cCI6MjA4Nzc3NjcwM30.cDOqsKWSPBbYmIT5tL1r1TN8gqWIL9QIEU6gfOtmr20';
const STORAGE_BUCKET = 'axon';               // bucket name

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Upload base64 PNG to Supabase Storage
 * Returns public URL or null on failure
 */
export async function uploadImage(b64, filename) {
    try {
        const byteString = atob(b64);
        const bytes = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) bytes[i] = byteString.charCodeAt(i);
        const blob = new Blob([bytes], { type: 'image/png' });

        const { data, error } = await supabase.storage
            .from(STORAGE_BUCKET)
            .upload(filename, blob, {
                contentType: 'image/png',
                upsert: true
            });

        if (error) { console.error('Upload error:', error); return null; }

        const { data: urlData } = supabase.storage
            .from(STORAGE_BUCKET)
            .getPublicUrl(filename);

        return urlData.publicUrl;
    } catch (e) {
        console.error('Upload failed:', e);
        return null;
    }
}

/**
 * List all images in the bucket
 * Returns array of { name, url }
 */
export async function listImages() {
    try {
        const { data, error } = await supabase.storage
            .from(STORAGE_BUCKET)
            .list('', { limit: 500, sortBy: { column: 'created_at', order: 'desc' } });

        if (error) { console.error('List error:', error); return []; }

        return data
            .filter(f => f.name.endsWith('.png'))
            .map(f => {
                const { data: urlData } = supabase.storage
                    .from(STORAGE_BUCKET)
                    .getPublicUrl(f.name);
                return { name: f.name, url: urlData.publicUrl };
            });
    } catch (e) {
        console.error('List failed:', e);
        return [];
    }
}
