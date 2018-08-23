const express = require('express');
const webpack = require('webpack');
const config = require('./config');
const devMiddle = require('webpack-dev-middleware');
const hotModule = require('webpack-hot-middleware');
const wepackConfig = require('./webpack.config.dev.js');

const opn = require('opn');
const path = require('path');
const app = express();
const portfinder = require('portfinder');
const staticPath= path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
const compiler = webpack(wepackConfig);

var server;
var _resolve, _reject;
var readyPromise = new Promise((resolve, reject) => {
    _resolve = resolve
    _reject = reject
});

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = config.dev.env;
}
console.log(wepackConfig.output.publicPath);
const devMiddleInstance = devMiddle(compiler, {
    publicPath: wepackConfig.output.publicPath,
    quiet: false
});
const hotModuleReplacementInstance = hotModule(compiler, {
    reload: true,
    heartbeat: 2000
});

app.use(devMiddleInstance);
app.use(hotModuleReplacementInstance);
app.use(staticPath, express.static('./static'));
portfinder.basePort = config.dev.port;

console.log('> 服务启动中...');

devMiddleInstance.waitUntilValid(function(){
    portfinder.getPort((err, port) => {
        if (err) {
            _reject(err)
        }
        process.env.PORT = port
        var uri = 'http://localhost:' + port
        console.log('> 服务地址 ' + uri + '\n')
            // when env is testing, don't need open it
        if (!!config.dev.autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
            opn(uri)
        }
        server = app.listen(port)
        _resolve()
    })
})

module.exports = {
    ready: readyPromise,
    close: () => {
        server.close()
    }
}