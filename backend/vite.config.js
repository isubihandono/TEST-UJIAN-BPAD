import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(import.meta.dirname, '../frontend/src'),
            'react': path.resolve(import.meta.dirname, './node_modules/react'),
            'react-dom': path.resolve(import.meta.dirname, './node_modules/react-dom'),
            '@inertiajs/react': path.resolve(import.meta.dirname, './node_modules/@inertiajs/react'),
            'lucide-react': path.resolve(import.meta.dirname, './node_modules/lucide-react'),
            'clsx': path.resolve(import.meta.dirname, './node_modules/clsx'),
            'tailwind-merge': path.resolve(import.meta.dirname, './node_modules/tailwind-merge'),
        },
    },
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
