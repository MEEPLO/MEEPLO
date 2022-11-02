module.exports = {
  arrowParens: 'avoid',
  bracketSameLine: true,
  bracketSpacing: true,
  singleQuote: true,
  trailingComma: 'all',
  tabWidth: 2,
  jsxBracketSameline: true,
  printWidth: 120,
  useTabs: false,
  semi: true,
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 200,
      },
    },
  ],
}
