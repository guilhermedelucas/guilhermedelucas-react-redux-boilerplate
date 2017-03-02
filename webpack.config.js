const webpack = require('webpack');

const plugins = [
    new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify("production")
        }
   }),
];

if (process.env.NODE_ENV == 'production') {
    console.log("production");
    plugins.push(new webpack.optimize.UglifyJsPlugin({
       compress: {
           warnings: false
       }
    }));
} else {
}

const conf = {
    entry: __dirname + '/src/app.js',
    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },
    plugins: plugins,
    module: {
        loaders: [
            {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: { presets: ['es2015', 'react', 'stage-0'] ,
                plugins: ['transform-decorators-legacy', 'react-hot-loader/babel']
                },
            }
        ]
    }
};

if (require.main == module) {
    webpack(conf, function(err, info) {
        if (err) {
            console.log(err);
        }
        if (info && info.compilation.errors.length) {
            console.log(info.compilation.errors);
        }
    });
} else {
    module.exports = require('webpack-dev-middleware')(webpack(conf), {
        watchOptions: {
            aggregateTimeout: 300
        },
        noInfo: false,
        publicPath: '/'
    });
}
