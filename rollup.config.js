
import nodeResolve from '@rollup/plugin-node-resolve';
import commonJs from '@rollup/plugin-commonjs';
import { eslint } from 'rollup-plugin-eslint';
import postcss from 'rollup-plugin-postcss';
import autoPreFixer from 'autoprefixer';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';

import pkg from './package.json';

const isProduction = process.env.NODE_ENV === 'production';

const name = pkg.name;
const version = pkg.version;

const config = {
    input: 'src/index.js', // 入口
    output: { // 出口
        file: `lib/${name}.js`,
        format: 'umd',
        sourcemap: true
    },
    plugins: [
        nodeResolve(),
        commonJs(),
        json(),
        eslint({
            fix: true
        }),
        postcss({
            minimize: true,
            // extract: true,
            plugins: [autoPreFixer()]
        }),
        replace({
            __VERSION__: version
        })
    ]
};

if (isProduction) {
    config.output = [
        {
            file: `lib/${name}.js`,
            format: 'umd',
            sourcemap: false
        },
        {
            file: `lib/${name}.min.js`,
            format: 'umd',
            sourcemap: false
        }
    ];

    // 添加压缩js代码
    config.plugins.push(terser({
        include: [/^.+\.min\.js$/, '*esm*']
    }));
}

export default config;
