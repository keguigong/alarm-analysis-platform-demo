module.exports = {
  tabWidth: 2,
  useTabs: false,
  semi: false, // 语句结尾统一不使用分号
  singleQuote: true, // 全程使用单引号
  trailingComma: 'none', // 结尾处不允许逗号
  // 与 eslint 保持一致，避免冲突
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended'
  ]
}
