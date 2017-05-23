var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: __dirname+'/app/main.js',
    output: {
        path: __dirname+'/app',
        // publicPath: "/app/",
        filename: 'bundle.js',
    },
    devServer:{
    	historyApiFallback:true,
		// hot:true,
		contentBase:"./app",
		// colors:true,
		inline:true//事实刷新？？？？
		//报错无法识别，删除后也能正常刷新
    },
    plugins:[
		new webpack.DefinePlugin({
		'process.env.NODE.ENV':"development"
		})
		,new webpack.HotModuleReplacementPlugin()
		]
};