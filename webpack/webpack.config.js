//在这个项目安装webpack （webpack5）
// npm i webpack webpack-cli  webpack-dev-server


//npm i html-webpack-plugin  html-webpack-tags-plugin copy-webpack-plugin
const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const HtmlTagsPlugin = require("html-webpack-tags-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const net = require('net');
let port=9000
let webpackBaseConfig = {
    // 默认打包成web平台的
    // target: 'web',
    // 环境 development(开发) 和 production(生产  这个模式启动要花大概5倍的时间，大概44s) 环境
    mode: 'development',
    devServer: {
        // contentBase: path.join(__dirname, 'dist'), //指定服务器的根路径（提供资源内容的目录） 已废弃
        static: path.join(__dirname, 'dist'), // 指定服务器的根路径（提供资源内容的目录） 最新写法
        compress: true, //启用或禁用压缩。如果设置为 true，服务器将启用 gzip 压缩。这有助于加快传输速度。
        port: 9000, //开启端口为9000   也可以直接在命令行中指定端口 webpack-dev-server --port 9000
        hot: true, //开启热更新服务
        open: true, //项目启动在默认浏览器打开
        client: {
            logging: 'none', // 不打印项目启动后webpack的提示信息以及热更新信息到控制台  
        },
        //禁用 Favicon 请求，原理就是自己指定static.directory这个静态服务文件的目录，然后开启监听，从而绕过了默认的favicon.ico图标的请求
        //如果不想禁用则将这个static注释 然后我们在项目的根目录存放我们的网站图标，命名为faction.ico
        // static: {
        //     directory: path.join(__dirname, '../src/assets'),
        //     watch: true,
        // },

        // hotOnly:true
    },
    //指定打包的入口文件  注意：__dirname表示webpack.config.js所在目录的绝对路径
    entry: path.resolve(__dirname, '../src/main.js'),
    //指定打包的出口文件
    output: {
        //指定打包后的文件要存放的文件目录 
        path: __dirname + '/dist',
        //指定打包后的文件名称
        filename: 'build.js'
    },
    resolve: {
        //自动补全文件后缀名
        extensions: ['.html', '.css', '.js', '.jsx', '.ts', '.tsx', '.vue'],
        //取别名
        alias: {
            "@": path.resolve(__dirname, "../src"),
        },
        fallback: {

        },
    },
    performance: {
        // 关闭性能提示(默认在mode:'production'的情况下打包后的build.js文件超过了244kb则会报错，发出警告)
        hints: false,

        //或者我们可以采用重新设置限制范围来解决
        // maxAssetSize: 500 * 1024, // 设置单个文件的大小上限，单位是字节
        // maxEntrypointSize: 500 * 1024, // 设置入口文件的大小上限，单位是字节
    },
    module: {
        rules: [
            //--------- 样式相关的loader     ---------start
            //npm i style-loader css-loader less-loader  sass-loader --save-dev
            {
                test: /\.css$/, // 通过正则表达式匹配所有以.css后缀的文件
                use: [ // 要使用的加载器，这两个顺序一定不要乱,因为加载器的执行顺序
                    //是从右到左(从下到上/从后到前)的                          
                    'style-loader', //再将js中的css通过创建style标签添加到html中
                    {
                        loader: "css-loader",//先将css资源编译成commonjs的模块到js中
                        options: {
                            esModule: false, //解决生成多余文件问题
                            importLoaders: 1
                        }
                    },
    


                ]
            },
            {
                //增加对less文件的支持
                test: /\.less$/,
                use: [ //要用多个loader来处理less文件
                    'style-loader',
                    {
                        loader: "css-loader",
                        options: {
                            esModule: false, //解决生成多余文件问题
                            importLoaders: 1
                        }
                    },

                    'less-loader'
                ]
            },
            {
                // 增加对 scss(sass) 文件的支持
                test: /\.(scss|sass)$/,
                // SCSS 文件的处理顺序为先 sass-loader 再 css-loader 再 style-loader
                use: ['style-loader', {
                    loader: "css-loader",
                    options: {
                        esModule: false, //解决生成多余文件问题
                        importLoaders: 1
                    }
                }, , 'sass-loader'],
            },
            //--------- 样式相关的loader    ---------end

            //--------- 对于react的jsx语法格式的js、jsx、ts、tsx文件的支持    ---------start
            //npm i babel-loader @babel/core @babel/preset-env @babel/preset-react @babel/runtime @babel/preset-typescript  core-js @babel/polyfill
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            //将es6的语法转化为es5，保证兼容
                            ["@babel/preset-env", {
                                // 设置兼容目标浏览器版本,这里可以不写,babel-loader会自动寻找上面配置好的文件.browserslistrc
                                // "targets": {
                                //  "chrome": 35,
                                //  "ie": 9
                                // },
                                "useBuiltIns": "usage", // 根据配置的浏览器兼容,以及代码中使用到的api进行引入polyfill按需添加
                                "corejs": 3 // 配置使用core-js低版本
                            }],
                            //将jsx的语法转化为浏览器能识别的js
                            ["@babel/preset-react", {
                                "runtime": "automatic"
                            }],
                            //将ts转化为js、tsx转化为jsx
                            [
                                "@babel/preset-typescript"
                            ]

                        ],

                        //   cacheDirectory: true
                    }
                }]
            },
            //---------对于react的jsx语法格式的js、jsx、ts、tsx文件的支持    ---------end

            //---------对于.vue文件的支持 ---------start
            //npm install vue-loader vue-template-compiler --save-dev
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            //---------对于.vue文件的支持 ---------end
            //---------对于各种形式的静态资源的支持   ---------start
            {
                test: /.(png|jpg|jpeg|gif|svg|bin)$/, // 匹配图片文件
                type: "asset", // type选择asset，告诉 Webpack 使用 asset 模块(webpack5的新特性，内部已经集成了对资源文件的处理，不需要额外安装 file-loader 或 url-loader)处理匹配到的文件。
                parser: { //配置解析器
                    dataUrlCondition: { //指定在什么条件下将图片转化为dataURL格式(也就是base64格式)
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator: { //配置生成器，指定输出打包后的静态资源文件的名称和路径。
                    filename: 'assets/images/[name][ext]', // 文件输出目录和命名
                },
            },
            {
                test: /\.(mp4|webm|mkv|mp3|ogg|wav|flac|aac)$/, //匹配视频和音频
                type: 'asset/resource',
                generator: {
                    filename: (pathData) => {
                        // 根据文件类型动态设置输出路径
                        const isVideo = /\.(mp4|webm|mkv)$/.test(pathData.filename); //视频格式
                        const basePath = isVideo ? 'assets/videos/' : 'assets/audio/';
                        return `${basePath}[name][ext]`;
                    },
                },
            },
            //---------对于各种形式的静态资源的支持   ---------end

            //--------- 添加一个处理字体文件的规则，排除 .woff 和 .ttf 文件 ---------start
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'assets/fonts/[name].[ext]',
                    },
                }, ],
            },
            //--------- 添加一个处理字体文件的规则，排除 .woff 和 .ttf 文件 ---------end

        ]

    },
    plugins: [ //插件都要使用require引入后再使用


        //将首页拷贝到打包后的dist文件夹中去,而且这个首页默认会关联上(引入)打包后点的文件(如build.js)
        new HtmlWebpackPlugin({
           // title: '首页', //生成的页面标题<head><title>首页</title></head>   好像没卵用
            filename: 'index.html', // dist目录下生成的文件名
            template: path.resolve(__dirname, '../src/index.html') // 我们原来的index.html，作为模板
        }),
        //引入vue的插件
        new VueLoaderPlugin(),
        //--------- 解决使用cesium报错、访问不到资源等问题 ---------start

        //用于在构建过程中复制文件或目录到输出目录(也就是output.path)
        //复制Cesium的静态资源文件到输出目录(无论是打包还是运行，这个动作都会做，所以就解决了之前访问不到cesium的资源的问题了)
        new CopyWebpackPlugin({
            patterns: [{
                    from: "node_modules/cesium/Build/Cesium", //要复制的资源
                    to: "assets/cesium", //复制到打包后的哪个文件夹
                },
                {
                    from: "src/assets",
                    to: "assets",
                }
            ],
        }),
        //用于向 HTML 文件中插入文件等标签
        new HtmlTagsPlugin({
            append: false, // 表示不追加到已存在的标签后面，而是替换掉已存在的同名标签（如果有的话）。
            tags: ["assets/cesium/Widgets/widgets.css", "assets/cesium/Cesium.js"], //将 cesium(打包后生成的) 的 Widgets/widgets.css 和 Cesium.js 文件标签插入到生成的 HTML 文件中
        }),
        //用于创建一个在编译时可以配置的全局常量
        new webpack.DefinePlugin({
            // CESIUM_BASE_URL: JSON.stringify("/cesium"),//但这个的用处我暂时还没发现，就算注释了也没有什么问题
            // 'process.env.NODE_ENV': JSON.stringify('production')
        }),
    ],
    //externals 配置项用于指定不应被打包的模块。当在代码中引入这些模块时，它们会被视为外部依赖，从而在构建时不会被打包到最终的输出文件中。
    externals: {
        cesium: "Cesium"
    }

    //--------- 解决使用cesium报错、访问不到资源等问题 ---------end
}

//端口占用检测函数
const tryUsePort = async function(port, portAvailableCallback){
    
    if(port <=0 || port>=65535 ){
        console.log("未找到合适的端口");
        return null
    }
    function portUsed(port){
        return new Promise((resolve, reject)=>{
            let server = net.createServer().listen(port);
            server.on('listening',function(){
                server.close();
                resolve(port);
            });
            server.on('error',function(err){
                if(err.code == 'EADDRINUSE'){
                    resolve(err);
                }
            });             
        });
    }
 
    let res = await portUsed(port);
    if(res instanceof Error){
        console.log(`端口：${port}被占用\n`);
        port++
        tryUsePort(port, portAvailableCallback);
    }else{
        portAvailableCallback(port);
    }
}
 


module.exports = new Promise((resolve,reject)=>{
    tryUsePort(port,function(nextPort){ //端口占用检测
        console.log(`检测到端口 ${nextPort} 可用--------,已为您自动切换到了此端口`);
        webpackBaseConfig.devServer.port=nextPort
        resolve(webpackBaseConfig)
    })

})

