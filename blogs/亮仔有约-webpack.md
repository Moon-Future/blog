废话少说，直接上。

## 初始化

1. 创建 demo 文件夹 webpack_demo

2. 生成默认 package.json `npm init -y`

3. 安装 webpack，在 webpack 3中，webpack 和 webpack-cli 是在同一个包中，但在 webpack 4中，两者被分开来分别管理，所以安装 webpack 4要同时安装两者

   `npm install webpack webpack-cli -D`

   此处我们选择局部安装，也可 `npm install webpack webpack-cli -g` 全局安装，但 webpack 升级更新较快，推荐在项目中局部安装，且在 npm 5.2后自带 npx 命令，可执行已安装依赖包中的命令 `npx webpack` === `./node_modules/.bin/webpack`，十分方便。

4. 创建目录 src 及入口文件 index.js

![目录初始化](D:\CL\WebProject\blog\images\webpack\init_tree.png)

## 打包

在项目目录下运行打包命令

`npx webpack` 或者 `./node_modules/.bin/webpack`

或者在 package.json 中 scripts 里加入 `"dev": "webpack"`

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack"
},
```

然后运行 `npm run dev`

![image-20200804105853104](D:\CL\WebProject\blog\images\Webpack\build.png)

打包成功，在项目目录下会生成 dist 文件夹，dist 文件夹下 main.js 即是 src/index.js 打包后的结果。

## 配置文件

上面打包后的结果（dist，main.js）来自于 webpack 默认配置，我们也可以通过配置文件来自定义输出文件目录与名称。

项目根目录下创建配置文件 webpack.config.js

```js
const { resolve } = require('path')

module.exports = {
  mode: 'development', // 'production' | 'development' | 'none'，默认 production
  // 入口文件
  entry: resolve(__dirname, 'src/index.js'),
  // 输出文件
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
}
```

重新打包后，dist 文件夹下会生成 bundle.js。

## 多入口文件

可以看到上面的示例是只有一个入口文件，对应一个输出文件，但是如果我有多个 js 需要打包，该如何做呢？

在 src 目录下创建多个 js 文件，a.js，b.js，c.js

```js
const { resolve } = require('path')

module.exports = {
  mode: 'development', // 'production' | 'development' | 'none'，默认 production
  entry: {
    a: resolve(__dirname, 'src/a.js'),
    b: resolve(__dirname, 'src/b.js'),
    c: resolve(__dirname, 'src/c.js')
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
}
```

'[name].js' 中的 name 对应 entry 中的键值 key。

重新打包后，dist 文件夹下会生成 a.js，b.js，c.js。

## Html 模板

在 src 目录下创建 html 文件，a.html，b.html，c.html

安装插件 html-webpack-plugin `npm install html-webpack-plugin -D`

1. 多入口文件配置

   ```js
   const { resolve } = require('path')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   module.exports = {
     mode: 'development', // 'production' | 'development' | 'none'，默认 production
     entry: {
       a: resolve(__dirname, 'src/a.js'),
       b: resolve(__dirname, 'src/b.js'),
       c: resolve(__dirname, 'src/c.js')
     },
     output: {
       path: resolve(__dirname, 'dist'),
       filename: '[name].js'
     },
   
     plugins: [
       new HtmlWebpackPlugin({
         template: resolve(__dirname, 'src/a.html'),
         filename: 'a.html',
         chunks: ['a']
       }),
       new HtmlWebpackPlugin({
         template: resolve(__dirname, 'src/b.html'),
         filename: 'b.html',
         chunks: ['b']
       }),
       new HtmlWebpackPlugin({
         template: resolve(__dirname, 'src/c.html'),
         filename: 'c.html',
         chunks: ['c']
       })
     ]
   }
   ```

   chunks 主要用于多入口文件，当你有多个入口文件，那就会编译后生成多个打包后的文件，那么 chunks 就能选择你要使用那些 js 文件，如果没有指定 chunks 选项，默认会全部引用。

   filename 的名称也可以自定义为其他名称。

   当入口文件很多时，可以写个函数，使用 node 的 fs 和 path 等方法遍历文件生成入口文件对象和对应的 HtmlWebpackPlugin 对象 。

   打包后，dist 目录下生成 a.html，b.html，c.html，并分别引入 js 文件 a.js，b.js，c.js。

2. 单一入口文件配置

   ```js
   const { resolve } = require('path')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   module.exports = {
     mode: 'development', // 'production' | 'development' | 'none'，默认 production
     
     // 入口文件
     entry: resolve(__dirname, 'src/index.js'),
     // 输出文件
     output: {
       path: resolve(__dirname, 'dist'),
       filename: 'bundle.js'
     },
     plugins: [
       new HtmlWebpackPlugin({
         template: resolve(__dirname, 'src/index.html'),
         filename: 'index.html'
       })
     ]
   }
   ```

   

