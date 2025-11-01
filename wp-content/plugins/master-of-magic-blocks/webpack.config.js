const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

/**
 * When hasExperimentalModulesFlag is enabled, the defaultConfig is an array of objects.
 * Loop through both sets of config objects and add the CopyWebpackPlugin to each.
 */
const newDefaultConfig = defaultConfig.map((config) => {
    config.plugins = [
        ...config.plugins,
        // Copy SVG files from src to build.
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: '**/*.svg',
                    context: path.resolve(__dirname, 'src'),
                    to: path.resolve(__dirname, 'build'),
                    noErrorOnMissing: true,
                },
            ],
        }),
    ];
    return config;
});

module.exports = newDefaultConfig;