const path = require('path');

const mode = 'production';

module.exports = (env, argv) => ({
  entry: path.resolve(__dirname, 'src/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'public/assets'),
    filename: `app.js`
  },
  externals:
    mode === 'production'
      ? {}
      : {
          react: 'React',
          'react-dom': 'ReactDOM'
        },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, 'src')],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-react'],
              [
                '@babel/preset-env',
                {
                  debug: mode === 'development',
                  targets: '> 1%, not dead, not ie 11',
                  useBuiltIns: 'usage',
                  corejs: 3
                }
              ]
            ]
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias:
      mode === 'development'
        ? {}
        : {
            react: 'preact/compat',
            'react-dom/test-utils': 'preact/test-utils',
            'react-dom': 'preact/compat'
          }
  }
});
