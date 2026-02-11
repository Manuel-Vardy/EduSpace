import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                about: resolve(__dirname, 'about.html'),
                contact: resolve(__dirname, 'contact.html'),
                products: resolve(__dirname, 'products.html'),
                news: resolve(__dirname, 'news.html'),
                services: resolve(__dirname, 'services.html'),
            },
        },
    },
});
