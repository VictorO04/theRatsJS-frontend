import { defineConfig, loadEnv } from 'vite';
import { cwd } from 'process';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
    const env = loadEnv(mode, cwd(), '');

    return defineConfig({
        plugins: [react()],
        server: {
            proxy: {
                '/api': {
                    target: 'https://ratsjs.onrender.com',
                    changeOrigin: true,
                    secure: true,
                    headers: {
                        'x-api-key': env.API_KEY,
                    },
                },
            },
        },
    });
};
