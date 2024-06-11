import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.ts', // The entry point of your library
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs', // CommonJS format
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'es', // ES module format
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    json(),
    typescript({ tsconfig: './tsconfig.json' }), // Adjust the path to your tsconfig.json
    postcss({
      extensions: ['.css', '.scss'],
      extract: true, // Extract CSS into a separate file
      minimize: true, // Minimize the CSS output
      use: [
        ['sass', {
          includePaths: ['./src/styles'] // Adjust this to your SCSS include paths if needed
        }]
      ]
    }),
  ],
  external: ['react', 'react-dom'], // Mark peer dependencies as external
};
