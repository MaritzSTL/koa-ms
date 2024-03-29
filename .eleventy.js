const CleanCSS = require("clean-css");

module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });
  return {
    dir: {
      input: "./docs",
      output: "./docs/_site"
    }
  };
};
