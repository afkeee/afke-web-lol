import { defineConfig } from 'tailwindcss'

export default defineConfig({
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                accent: '#ff9f48',
            },
            fontFamily: {
                display: ['"Reddit Sans"', 'ui-sans-serif', 'system-ui'],
                body: ['"Reddit Sans"', 'ui-sans-serif', 'system-ui'],
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeOut: {
                    '0%': { opacity: '1' },
                    '100%': { opacity: '0' },
                },
                borderTop: {
                    '0%': { width: '0' },
                    '100%': { width: '100%' }
                },
                borderRight: {
                    '0%': { height: '0' },
                    '100%': { height: '100%' }
                },
                borderBottom: {
                    '0%': { width: '100%' },
                    '100%': { width: '0' }
                },
                borderLeft: {
                    '0%': { height: '100%' },
                    '100%': { height: '0' }
                }
            },
            animation: {
                fadeIn: 'fadeIn 1.5s ease-in',
                fadeOut: 'fadeOut 1.5s ease-out',
            }
        },
    },
    plugins: [heroui()],
})