import { defineConfig } from 'vite';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production';
  
  return {
    base: isProduction ? '/QuestAGRO_cursor/' : '/',
    build: {
      sourcemap: !isProduction,
      minify: isProduction ? 'terser' : false,
      rollupOptions: {
        input: 'index.html',
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
            if (id.includes('src/js/')) {
              return 'app';
            }
          },
          assetFileNames: assetInfo => {
            if (assetInfo.name && assetInfo.name.endsWith('.html')) {
              return '[name].[ext]';
            }
            if (assetInfo.name && assetInfo.name.endsWith('.css')) {
              return 'assets/css/[name]-[hash][extname]';
            }
            if (assetInfo.name && /\.(png|jpe?g|gif|svg|ico|webp)$/.test(assetInfo.name)) {
              return 'assets/images/[name]-[hash][extname]';
            }
            return 'assets/[name]-[hash][extname]';
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
        },
      },
      outDir: 'dist',
      emptyOutDir: true,
      target: 'es2015',
    },
    plugins: [
      FullReload(['./src/**/**.html']),
      SortCss({
        sort: 'mobile-first',
      }),
      viteStaticCopy({
        targets: [
          {
            src: 'public/partials',
            dest: ''
          }
        ]
      })
    ],
    server: {
      port: 5173,
      host: true,
      open: true,
    },
    preview: {
      port: 4173,
      host: true,
      open: true,
    },
    optimizeDeps: {
      include: ['src/js/refs.js'],
    },
  };
});
