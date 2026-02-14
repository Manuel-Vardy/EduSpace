import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
                companyNews: resolve(__dirname, 'company-news.html'),
            },
        },
    },
});
