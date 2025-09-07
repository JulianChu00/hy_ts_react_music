module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  parser: '@typescript-eslint/parser', // ⭐ 用 TypeScript 解析器
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    'eslint:recommended', // ESLint 推荐规则
    'plugin:react/recommended', // React 推荐规则
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended', // ⭐ TS 推荐规则
    'plugin:prettier/recommended' // 和 Prettier 集成
  ],
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'prettier/prettier': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    // ⭐ 关掉 JS 的 no-undef（否则 TS 类型会被误报）
    'no-undef': 'off',

    // ⭐ 交给 TS 来处理未使用变量
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
    ],

    'react/prop-types': 'off', // TS 项目不需要 PropTypes
    'react/react-in-jsx-scope': 'off' // React 17+ 不需要 import React
  }
}
