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
        'notistack',
        '@radix-ui/react-slot',
        '@radix-ui/react-dialog',
        '@radix-ui/react-checkbox',
        '@radix-ui/react-dropdown-menu',
        '@radix-ui/react-icons',
        '@radix-ui/react-label',
        '@radix-ui/react-popover',
        '@radix-ui/react-select',
        '@radix-ui/react-separator',
        "react-day-picker",
        "@tanstack/react-table",
        "cmdk",
        "date-fns",
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@nextui-org/react': 'NextUI',
          'lucide-react': 'LucideReact',
          moment: 'moment',
          notistack: 'Notistack',
          '@radix-ui/react-slot': 'RadixUIReactSlot',
          '@radix-ui/react-dialog': 'RadixUIDialog',
          '@radix-ui/react-checkbox': 'RadixUICheckbox',
          '@radix-ui/react-dropdown-menu': 'RadixUIDropdownMenu',
          '@radix-ui/react-icons': 'RadixUIIcons',
          '@radix-ui/react-label': 'RadixUILabel',
          '@radix-ui/react-popover': 'RadixUIPopover',
          '@radix-ui/react-select': 'RadixUISelect',
          '@radix-ui/react-separator': 'RadixUIReactSeparator',
          "react-day-picker": "ReactDayPicker",
          "@tanstack/react-table": "ReactTable",
          "cmdk": "Cmdk",
          "date-fns": "DateFns",
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
