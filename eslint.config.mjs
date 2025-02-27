import globals from "globals";
import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin-js'


/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  {    
    // ignores: ["dist/**"],
    ignores: ["dist/**", "node_modules/**", "dist/assets/index-CB1-m9sl.js"],
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
      ecmaVersion: "latest",
    },
    plugins: {
      '@stylistic/js': stylisticJs
    },
    rules: {
      '@stylistic/js/indent': [
        'error',
        2
      ],
      '@stylistic/js/linebreak-style': [
        'error',
        'unix'
      ],
      '@stylistic/js/quotes': [
        'error',
        'single'
      ],
      '@stylistic/js/semi': [
        'error',
        'never'
      ],
    },
  },
]