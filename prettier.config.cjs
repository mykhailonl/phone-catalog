module.exports = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  plugins: ['prettier-plugin-tailwindcss'],
  attributeGroups: ['^class$', '^(id|name)$', '^data-', '$DEFAULT'],
  attributeSort: 'ASC',
  tailwindAttributes: ['className', 'class', 'tw'],
  tailwindFunctions: ['clsx', 'cn'],
  tailwindConfig: './tailwind.config.js',
};
