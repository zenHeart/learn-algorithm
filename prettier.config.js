/** @type {import("prettier").Config} */
export default {
  semi: false,
  singleQuote: true,
  quoteProps: 'as-needed',
  trailingComma: 'es5',
  tabWidth: 2,
  printWidth: 80,
  useTabs: false,
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid',
  endOfLine: 'lf',
  jsxSingleQuote: true,
  plugins: ['prettier-plugin-tailwindcss']
}
