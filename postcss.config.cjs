module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-wrap')({
      selector: '.vinze-react-admin',
      skip: null,
    }),
  ],
};
