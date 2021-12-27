const {styles} = require('@ckeditor/ckeditor5-dev-utils')
module.exports = function (config, options, targetOptions) {
    config.module.rules.push(
        {
            test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
            use: ['raw-loader']
        },
        {
            test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
            use: [
                {
                    loader: 'style-loader',
                    options: {
                        injectType: 'singletonStyleTag',
                        attributes: {
                            'data-cke': true
                        }
                    }
                },
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: styles.getPostCssConfig({
                            themeImporter: {
                                themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
                            },
                            minify: false
                        })
                    }
                }
            ]
        },
    )
    ;
///hack hack hack. - we force angular not to process the css that has ckeditor5 in its name
    const cssRule = config.module.rules.find(x => x.test.exec && x.test.exec('.css'));
    cssRule.exclude = /ckeditor5/;
    return config;
}
;
