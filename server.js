//var webpack = require('webpack');
//var WebpackDevServer = require('webpack-dev-server');
//var config = require('./webpack.config');
//
//new WebpackDevServer(webpack(config), {
//  publicPath: config.output.publicPath,
//  hot: true,
//  historyApiFallback: true
//}).listen(3000, 'localhost', function (err, result) {
//  if (err) {
//    return console.log(err);
//  }
//
//  console.log('Listening at http://localhost:3000/');
//});


/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();
//var app = require('./app');

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
}
app.get('/', function response(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
  //res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
  //res.end();
});
var routes = require('./routes/index');
var users = require('./routes/users');
var dish = require('./routes/dish');
var promotion = require('./routes/promotion');
var leadership = require('./routes/leadership');
var comments = require('./routes/comments');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/static', express.static(path.join(__dirname, 'dist')));

app.use('/', routes);
app.use('/users', users);
app.use('/dishes', dish);
app.use('/promotions', promotion);
app.use('/leadership', leadership);
app.use('/comments', comments);

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});