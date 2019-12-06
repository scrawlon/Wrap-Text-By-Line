
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

export default [
  {
    input: './src/index.js',
    output: [
      {
        file: './lib/wrap-text-by-line.js',
        format: 'cjs',
      },
      {
        file: './lib/wrap-text-by-line.esm.js',
        format: 'esm',
      }
    ],
    plugins: [
      babel({
        exclude: 'node_modules/**'
      }),
    ]
  },
  {
    input: './src/index.js',
    output: [
      {
        file: './lib/wrap-text-by-line.min.js',
        format: 'iife',
        name: 'AnimationBlock'
      }
    ],
    plugins: [
        babel({
          exclude: 'node_modules/**'
        }),
        uglify()
    ]
  }
]
