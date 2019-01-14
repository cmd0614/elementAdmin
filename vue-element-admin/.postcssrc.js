// https://github.com/michael-ciniawsky/postcss-load-config

// css后处理，预处理sass、less，预处理是以编程的方式来写，定义变量，定义方法，（$定义变量，mixin定义方法）
//postcss 后处理，可以进行添加前缀，
module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {}
  }
}
