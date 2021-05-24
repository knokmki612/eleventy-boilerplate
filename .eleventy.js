const globby = require("globby");
const { basename, dirname } = require("path");
const Image = require("@11ty/eleventy-img");
const CacheBuster = require("@mightyplow/eleventy-plugin-cache-buster");

(async () => {
  const images = await globby(["**/*.{jpeg,jpg,png,webp,gif,tiff,avif,svg}"], {
    gitignore: true,
  });
  for (const image of images) {
    await Image(image, {
      filenameFormat() {
        return basename(image);
      },
      formats: [null],
      outputDir: `_site/${dirname(image)}`,
    });
  }
})();

module.exports = (eleventyConfig) => {
  if (process.env.NODE_ENV === "production") {
    eleventyConfig.addPlugin(CacheBuster({}));
  }
  // NOTE: This option will copy not only templates
  eleventyConfig.setTemplateFormats(["js", "mp4", "webm"]);
};
