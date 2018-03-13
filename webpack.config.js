const path = require('path');
const SERVER_URL = 'http://localhost';
const SERVER_PORT = process.env.PORT || 3000;
const SOCKET_PORT = SERVER_PORT+1;
const EXTENSIONS = ['*', '.js', '.jsx'];
const CLIENT_DIR = `${__dirname}/client/`;
const CONTENT_BASE = `${CLIENT_DIR}/static_content/`;
const OUTPUT_PATH = `${CLIENT_DIR}/dist_jsx`;
const webpack = require('webpack');

const appScript = `${CLIENT_DIR}/src_jsx/App.jsx`;

module.exports = {
  entry:
  {
    app: appScript,
    /*App2: `${CLIENT_DIR}/src_jsx/App.jsx`,*/
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: EXTENSIONS
  },
  output: {
    path: OUTPUT_PATH,
    publicPath: '/dist_jsx/',
    filename: '[name].js'
  },
  devServer: {
    contentBase: CONTENT_BASE,
    proxy: {
      '/api/*': { target: `${SERVER_URL}:${SERVER_PORT}`},
      '/socket': { target: `${SERVER_URL}:${SOCKET_PORT}`, ws : true },
    },
    before(app){
      /*app.get('/', function(req, res) {
        let INDEX_PAGE;
        let tmp_condition = true;
        if (tmp_condition)
          INDEX_PAGE = path.resolve(`${CONTENT_BASE}/app.html`);
        else
          INDEX_PAGE = path.resolve(`${CONTENT_BASE}/index.html`);
        res.sendFile(`${INDEX_PAGE}`);
      });
      */

      app.get('/', function(req, res) {
        let INDEX_PAGE = path.resolve(`${CONTENT_BASE}/index.html`);
        res.sendFile(`${INDEX_PAGE}`);
      });

      app.get('/app', function(req, res) {
        let INDEX_PAGE = path.resolve(`${CONTENT_BASE}/app.html`);
        res.sendFile(`${INDEX_PAGE}`);
      });

      app.get('/login', function(req, res) {
        let INDEX_PAGE = path.resolve(`${CONTENT_BASE}/login.html`);
        res.sendFile(`${INDEX_PAGE}`);
      });

      app.get('/register', function(req, res) {
        let INDEX_PAGE = path.resolve(`${CONTENT_BASE}/register.html`);
        res.sendFile(`${INDEX_PAGE}`);
      });

      app.get('/*.html', function(req, res) {
        res.redirect('/');
      });
    }
  },
  plugins : [
    new webpack.HotModuleReplacementPlugin(),
  ],
};