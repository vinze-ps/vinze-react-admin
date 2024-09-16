import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import * as path from 'path';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ['./src/**/*.ts', './src/**/*.tsx'],
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      name: 'VinzeReactAdmin',
      formats: ['es', 'cjs'],
      fileName: (format) => `vinze-react-admin.${format}.js`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        '@nextui-org/react',
        'lucide-react',
        'moment',
        "date-fns",
        "framer-motion",
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@nextui-org/react': 'NextUI',
          'lucide-react': 'LucideReact',
          moment: 'moment',
          "date-fns": "DateFns",
          "framer-motion": "FramerMotion",
        },
        assetFileNames: 'assets/[name].[ext]',
      },
    },
    cssCodeSplit: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
