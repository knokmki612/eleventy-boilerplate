module.exports = ({ env }) => ({
  map: false,
  plugins: {
    "postcss-import": {},
    "postcss-nested": {},
    autoprefixer: {},
    "postcss-csso": env === "production" ? {} : false,
  },
});
