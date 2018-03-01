const path = require('path');
const SERVER_URL = 'http://localhost:3000';
const EXTENSIONS = ['*', '.js', '.jsx'];
const CLIENT_DIR = `${__dirname}/client/`;
const CONTENT_BASE = `${CLIENT_DIR}/static_content/`;
const OUTPUT_PATH = `${CLIENT_DIR}/dist_jsx`;

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
      '/api/*': {
        target: SERVER_URL
      },
    },
    before(app){
      app.get('/', function(req, res) {
        let INDEX_PAGE;
        let tmp_condition = true;
        if (tmp_condition)
          INDEX_PAGE = path.resolve(`${CONTENT_BASE}/app.html`);
        else
          INDEX_PAGE = path.resolve(`${CONTENT_BASE}/index.html`);
        res.sendFile(`${INDEX_PAGE}`);
      });

      app.get('/*.html', function(req, res) {
        res.redirect('/');
      });
    }
  }
};