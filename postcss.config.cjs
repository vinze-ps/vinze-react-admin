const prefixer = require('postcss-prefix-selector');

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    prefixer({
      prefix: '.vinze-react-admin',
      transform(prefix, selector, prefixedSelector) {
        if (selector === ':root' || selector.startsWith('html') || selector.startsWith('body')) {
          return selector;
        }
        return prefixedSelector;
      },
    }),
  ],
};
