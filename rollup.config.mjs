import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default {
  input: 'api/index.js',
  output: {
    file: 'dist/index.js',
    format: 'es'
  },
  plugins: [nodeResolve(),commonjs(),json()],
  // external: ["mongoose"],
};