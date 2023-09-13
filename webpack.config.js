const webpack = require("webpack"); // 访问内置的插件
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  // 开发模式
  mode: "development",
  devServer: {
    hot: true,
    static: "./dist", // 本地服务器所加载的页面的目录
  },
  entry: "./src/index.js", // 入口文件
  devtool: "eval-source-map", // 配置在开发环境时，生成源码， 为了方便开发时定位，生成源码
  // 输出配置，告诉 webpack 在哪里输出它所创建的 bundle，以及如何命名这些文件。
  // 主要输出文件的默认值为 ./dist/main.js, 其他生成文件默认放置在 ./dist 文件夹中
  output: {
    // bundle 生成位置
    path: path.resolve(__dirname, "dist"),
    // bundle bundle 文件名称
    filename: "main.js",
    // 打包之前清理 dist 文件夹
    // clean: true,
  },
  // module.rules 配置 loader
  // 其中 test 属性 填写匹配规则（需要哪些文件进行转换）
  // use 属性，定义使用的loader， 可以填写多个loader(多个时,书写顺序和调用顺序相反)
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        // 排除 node_modules 目录下的文件
        // node_modules 目录下的文件都是采用的 ES5 语法，没必要再通过 Babel 去转换
        exclude: [path.resolve(__dirname, "node_modules")],
        include: [path.resolve(__dirname, "src")],
        use: {
          // loader: "babel-loader?cacheDirectory=true", // 引入 babel 插件并开启缓存,开启缓存后可以提升后续打包效率
          loader: "babel-loader", // 或者缓存可在options中加
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-transform-runtime"],
            // babel-loader 支持缓存转换出的结果，通过 cacheDirectory 选项开启
            // 使用 cacheDirectory 选项将 babel-loader 的速度提高2倍
            cacheDirectory: true,
            // 在时间不那么重要的时候节省磁盘空间
            cacheCompression: true,
            compact: true,
          },
        },
      },
      {
        test: /\.(css|less)$/,
        use: [
          MiniCssExtractPlugin.loader, // 占位
          // "style-loader", // 将编译好的 css 动态渲染到 html 中
          "css-loader", // 负责编译 css 文件
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
          "less-loader", //负责将 less 文件编译成为css 文件
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/, // 需要图片资源打包的路径匹配规则
        typpe: "asset/resource",
        generator: {
          filename: "img/[hash][ext][query]", // 输出路径及文件名，与 output 功能一直
        },
        include: [path.resolve(__dirname, "src")],
        // // webpack 5  之前通常使用 loader 插件
        // loader: "file-loader",
        // options: {
        //   name: "[name].[ext]",
        //   outputPath: "images/",
        //   useRelativePath: false,
        // },
      },
    ],
  },
  // loader 用于转换不能识别的代码，而插件则用于更广的 任务
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html", // 生成 Html 文件的 模板 文件
      filename: "index.html", // 生成的 Html 文件名
      inject: "body", // <script> 标签插入的地方
    }),
    new MiniCssExtractPlugin({
      filename: "./styles/[contenthash].css", // 确定每个输出的 CSS 文件的名称,默认 [name].css
    }),
  ],

  // 优化
  optimization: {
    // optimization.minimizer 属性允许你通过一个或多个定制的 TerserPlugin 实例,覆盖默认压缩工具(minimizer)
    minimizer: [new CssMinimizerWebpackPlugin()],
    minimize: true, // 开发环境下启用 css 优化，不设置为 true 只会在 开发环境下压缩
  },
};
