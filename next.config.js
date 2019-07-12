const withCss = require("@zeit/next-css");
const withPurgeCss = require("next-purgecss");

module.exports = withCss(
  withPurgeCss({
    target: "serverless",
    purgeCssEnabled: () => process.env.NODE_ENV === "production",
    purgeCssPaths: ["pages/**/*", "src/**/*"]
  })
);
