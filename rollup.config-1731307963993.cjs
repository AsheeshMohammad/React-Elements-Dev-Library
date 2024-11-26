'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var resolve = require('@rollup/plugin-node-resolve');
var commonjs = require('@rollup/plugin-commonjs');
var typescript = require('@rollup/plugin-typescript');
var json = require('@rollup/plugin-json');
var postcss = require('rollup-plugin-postcss');

var rollup_config = {
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

exports.default = rollup_config;
