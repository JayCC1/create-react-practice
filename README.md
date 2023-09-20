# 手动创建简单 react 项目模板练习

## 插件



#### -- webpack

静态模块打包工具,可以将我们的代码打包成浏览器可以认识的文件



#### -- webpack-cli

webpack 命令的使用依赖 webpack-cli



#### -- HtmlWebpackPlugin

自动生成一个 Html5 文件,并在 body 中 script 标签引入你所有 webpack 中生成的 bundle
将我们编译好的 js 及 css 文件动态添加到 html 中
安装 pnpm install -D html-webpack-plugin



#### -- MiniCssExtractPlugin

会将 `CSS` 提取到单的文件中,为每个包含 `CSS` 的 `JS` 文件(打包后的)创建一个 CSS 文件,
并且支持 `CSS` 和 `SourceMaps` 的按需加载
安装 pnpm install mini-css-extract-plugin -D



#### -- CssMinimizerWebpackPlugin

开发过程中会存在一些空格和引号之类的东西，会严重影响我们打包后的体积，所以需要压缩
插件是使用 `cssnano` 优化和压缩 Css



#### -- babel-loader

用来预处理文件,webpack 中用 babel 解析 ES6 的桥梁



#### -- @babel/core

babel 的核心模块，提供转换的 API

#### -- @babel/preset-env

babel/preset 开头的代表预设,babel 预设,一组 babel 插件的集合,@babel/preset-env 用来将 ES5+的高级语法转化为 es5

#### -- @babel/runtime

内置 webpack 打包生成需要的全局辅助函数, regeneratorRuntime 插件

#### -- @babel/plugin-transform-runtime

会在需要 regeneratorRuntime 的地方自动 require 导入

#### -- @babel/preset-react

将 `jsx` 转换成 `ES5`

#### -- babel-plugin-import

是用于配置 antd 按需引入

#### -- webpack-dev-server

提供本地的 web 服务,同时具有 live reloading(实时重新加载的功能)

#### -- clean-webpack-plugin

每次打包钱自动删除上次打包的东西



## loader

#### style-loader 

将模块的内容作为样式并添加到 DOM 中

#### css-loader  

加载 CSS 文件并解析 import 的 CSS 文件，最终返回 CSS 代码,将 css 文件编译为 webpack 能识别的模块

#### less-loader  

加载并编译 LESS 文件,负责将 less 文件编译为 css 文件

#### sass-loader  

加载并编译 SASS/SCSS 文件

#### postcss-loader  

使用  PostCSS  加载并转换 CSS/SSS 文件,对我们的 css 文件进行兼容性处理

#### stylus-loader  

加载并编译 Stylus 文件,会动态生成 style 标签并将 css 内容放进去进行渲染

#### postcss-loader 

桥梁，兼容各种浏览器,手动添加前缀很麻烦,通过配置 postcss-loader 来自动添加前缀,(相关依赖还有 postcss 插件,postcss-preset-env 预设)

#### postcss-preset-env 

帮 postcss 找到 package.json 中 browserslist 里面的配置，通过配置加载指定的 css 兼容性样式，内置 autoprefixer



- 资源模块(asset module)是一种模块类型，它允许使用资源文件（字体，图标等）而无需配置额外 loader。

  - 在 webpack 5 之前，通常使用：
    -- raw-loader 将文件导入为字符串
    -- url-loader 将文件作为 data URI 内联到 bundle 中
    -- file-loader 将文件发送到输出目录
  - 资源模块类型(asset module type)，通过添加 4 种新的模块类型，来替换所有这些 loader：
    -- asset/resource 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现。
    -- asset/inline 导出一个资源的 data URI。之前通过使用 url-loader 实现。
    -- asset/source 导出资源的源代码。之前通过使用 raw-loader 实现。
    -- asset 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源体积限制实现。
- npm 库
  -- PostCss 解析 Css 代码，结果提供给其他插件使用，比如 `Autoprefixer` 等插件
