const {styles} = require('@ckeditor/ckeditor5-dev-utils')
module.exports =
    {
        module: {
            rules: [
                {
                    test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
                    use: ['raw-loader']
                },
                {
                    test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
                    use: [
                        {
                            loader: './node_modules/@ckeditor/ckeditor5-dev-utils/node_modules/postcss-loader/src/index.js',
                            options:
                                styles.getPostCssConfig({
                                    themeImporter: {
                                        themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
                                    },
                                    minify: false
                                })

                        }
                    ]
                },
            ]
        }
    };
