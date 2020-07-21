# 学习Rollup.js打包之插件详解

### 1. rollup-plugin-node-resolve

> 帮组Rollup查找外部模块，然后安装[相关配置](https://github.com/rollup/rollup-plugin-node-resolve)

```js
import reslove from "rollup-plugin-node-resolve";

const config = {

    ...
    plugins:[
        resolve({
            mainFields:['module','main'], // module表示es6模块
            browser:true, // 在浏览器中运行
        })
    ]

}
```

### 2. rollup-plugin-commonjs

> rollup-plugin-node-resolve 插件可以解决 ES6模块的查找导入，但是npm中的大多数包都是以CommonJS模块的形式出现的，所以需要使用这个插件将CommonJS模块转换为 ES2015 供 Rollup 处理

```js
import commmonjs from 'rollup-plugin-commonjs'

const config = {

    plugins:[
        commonjs({
            include:"node_module/**"
        })
    ]
}
```

### 3. rollup-plugin-babel

> 通过这个插件可以方便的使用JavaScript的新特性，配置步骤：

> 1) 安装babel依赖

```shell
npm install -save-dev @babel/core @babel/preset-env  rollup-plugin-babel
```

> 2) 创建.babelrc 文件，配置babel

```js
{
    "presets": [
        "@babel/preset-env"
    ]
}

```

> 3) 在rollup.config.js配置文件配置babel

```js
import babel from 'rollup-plugin-babel'

const config =  {

    plugins:[
        babel({
            exclude:'node_modules/**'
        })
    ]
}

```

### 4. rollup-plugin-eslint

>集成eslint,配置步骤：

> 1) 安装相关依赖

```shell
npm install --save-dev rollup-plugin-eslint
```

> 2) 创建.eslintrc.js文件，配置eslint规则

```js
module.exports = {
    'root': true,
    'env': {
        'browser': true,
        'es6': true
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'sourceType': 'module'
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ]
    }
};
```

> 3)在rollup.config.js配置eslint

```js
import eslint from 'rollup-plugin-eslint';

const const = {

    plugins:[
        eslint({
            fix: true
        })
    ]

}

```

### 5.rollup-plugin-terser

> 该插件在生产环境下，压缩js代码，能够打包es6模块，而rollup-plugin-uglify不能打包e6模块

```js
import { terser } from 'rollup-plugin-terser';

const env = process.env.NODE_ENV || 'development';
const isProduction = env === 'production';

const config = {
    plugins:[]
}

if(isProduction){
    config.plugins.push(
        terser(
            include: [/^.+\.min\.js$/] // 压缩js文件
        )
    );
}

```

### 6.rollup-plugin-postcss

> 通过该插件，分离编译打包css文件，配合node-sass/less可以打包scss/less

```js
import sass from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';

const config = {
    plugins:[
        postcss({
            minimize: true, // 压缩
            // extract: true, //是否分离
            plugins: [autoPreFixer()]
        })
    ]
}
```

### 7.rollup-plugin-json

> 将引入的.json文件转变成es模块

```js
import json from 'rollup-plugin-json';

import pkg from './package.json';

console.log(pkg.name);

const config = {
    plugins:[
        json(),
    ]
}
```

### 7.rollup-plugin-replace

> 变量替换，可以将动态设置的变量提取出来在配置文件中设置

```js
import replace from 'rollup-plugin-replace';

const config = {
    plugins:[
        replace({
            include: 'src/scripts/main.js',
            ENV: JSON.stringify(env)
        }),
    ]
}
```


### 8.rollup-plugin-serve

> 开启本地服务，相当于webpack-dev-server

```js

import serve from 'rollup-plugin-serve';


const env = process.env.NODE_ENV || 'development';
const isProduction = env === 'production';

const config = {
    plugins:[]
}

if(isProduction){
    config.plugins.push(
        terser()
    );
}else{
    serve({
        open: true,
        contentBase: './', // 入口文件
        historyApiFallback: true,
        host: 'localhost',
        port: 8000
    });
}
```

### 9.rollup-plugin-livereload

> 配合 rollup-plugin-serve 使用,实现实时刷新页面

```js
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';



const env = process.env.NODE_ENV || 'development';
const isProduction = env === 'production';

const config = {
    plugins:[]
}

if(isProduction){
    config.plugins.push(
        terser()
    );
}else{
    serve({
        open: true,
        contentBase: './', // 入口文件
        historyApiFallback: true,
        host: 'localhost',
        port: 8000
    });
    livereload('lib');
}
```

在index.js或者index.html中插入如下代码，即可实时更新：

```js

document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')

```

