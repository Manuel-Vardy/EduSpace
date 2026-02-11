import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                about: resolve(__dirname, 'about.html'),
                contact: resolve(__dirname, 'contact.html'),
                industries: resolve(__dirname, 'industries.html'),
                news: resolve(__dirname, 'news.html'),
                services: resolve(__dirname, 'services.html'),
            },
        },
    },
});
