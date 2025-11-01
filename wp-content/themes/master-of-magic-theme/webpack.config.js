const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
  ...defaultConfig,
  ...{
    entry: {
      'js/editor': path.resolve(process.cwd(), 'resources/js', 'editor.js'),
      'js/screen': path.resolve(process.cwd(), 'resources/js', 'screen.js'),
      'css/screen': path.resolve(
        process.cwd(),
        'resources/scss',
        'screen.scss'
      ),
      'css/editor': path.resolve(
        process.cwd(),
        'resources/scss',
        'editor.scss'
      ),
    },
  },
};
