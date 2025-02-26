import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import typescript2 from 'rollup-plugin-typescript2';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    typescript2({
      check: false,
      include: [
        'src/components/*.vue',
        'src/components/**/*.vue',
        'src/*.ts',
        'src/**/*.ts'
      ],
      tsconfigOverride: {
        compilerOptions: {
          outDir: 'dist',
          sourceMap: true,
          declaration: true,
          declarationMap: true
        }
      },
      exclude: ['vite.config.ts', 'main.ts']
    })
  ],

  build: {
    cssCodeSplit: false,
    lib: {
      entry: './src/BandsinTownMapPlugin.ts',
      formats: ['es', 'cjs'],
      name: 'BandsinTownGigMap',
      fileName: (format) => `plugin.${format}.js`
    },
    rollupOptions: {
      external: ['vue'], // Externalize both Vue and Leaflet
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          leaflet: 'L'
        }
      }
    }
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
