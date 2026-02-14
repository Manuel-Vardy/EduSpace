import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                about: resolve(__dirname, 'about.html'),
                news: resolve(__dirname, 'news.html'),
                newsDetails: resolve(__dirname, 'news-details.html'),
                services: resolve(__dirname, 'services.html'),
                partnership: resolve(__dirname, 'partnership.html'),
                productUpdate: resolve(__dirname, 'product-update.html'),
            },
        },
    },
});
