import {defineConfig} from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from "@tailwindcss/vite";
import fs from 'fs';
import path from 'path';

// The panel themes import Filament's base CSS from vendor/, which asset-only
// builds without Composer (Vercel) do not have.
const filamentThemeInstalled = fs.existsSync(
    path.resolve(import.meta.dirname, 'vendor/filament/filament/resources/css/theme.css'),
);

export default defineConfig({
    plugins: [
        laravel({
            input: [
                // Marketing website
                'resources/css/app.css',
                'resources/js/app.js',
                // Echo (Reverb WebSocket client)
                'resources/js/echo.js',
                'resources/js/motion.js',
                // Passkeys client (loaded on demand by Blade components)
                'resources/js/passkeys.js',
                // Chat
                'packages/Chat/resources/js/chat.js',
                // Filament
                ...(filamentThemeInstalled
                    ? [
                        'resources/css/filament/app/theme.css',
                        'resources/css/filament/admin/theme.css',
                    ]
                    : []),
                // Documentation
                'packages/Documentation/resources/css/documentation.css',
                'packages/Documentation/resources/js/documentation.js',
            ],
            refresh: true,
        }),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': '/resources/js',
            '~': path.resolve(import.meta.dirname, './resources'),
        },
    },
});
