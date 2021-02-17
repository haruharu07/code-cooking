require("dotenv").config();

module.exports = {
    siteMetadata: {
        title: `Code Cooking`,
        author: {
            name: `Haru Nakama`,
        },
        description: `JavaScriptのコードレシピです。実務でよく使用するJavaScriptの基本的な記述を、ゆるゆるぐつぐつお届けします。`,
        siteUrl: `https://gatsby-starter-blog-demo.netlify.app/`,
        categories: [
            {
                slug: "recipe",
                color: "#F76D43",
            },
            {
                slug: "basic",
                color: "#36C1F7",
            },
        ],
    },
    plugins: [
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/blog`,
                name: `blog`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/assets`,
                name: `assets`,
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    `gatsby-remark-code-titles`,
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 800,
                            linkImagesToOriginal: false,
                        },
                    },
                    {
                        resolve: `gatsby-remark-responsive-iframe`,
                    },
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            classPrefix: "language-",
                            inlineCodeMarker: null,
                            aliases: {},
                            // showLineNumbers: true,
                            noInlineHighlight: false,
                        },
                    },
                    `gatsby-remark-copy-linked-files`,
                    `gatsby-remark-smartypants`,
                    {
                        resolve: "gatsby-remark-custom-blocks",
                        options: {
                            blocks: {
                                frame: {
                                    classes: "code-frame",
                                },
                                tech: {
                                    classes: "tech",
                                    title: "optional",
                                },
                                note: {
                                    classes: "note",
                                    title: "optional",
                                },
                                tech: {
                                    classes: "tech",
                                    title: "optional",
                                },
                                do: {
                                    classes: "do",
                                    title: "optional",
                                },
                            },
                        },
                    },
                ],
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-plugin-feed`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Gatsby Starter Blog`,
                short_name: `GatsbyJS`,
                start_url: `/`,
                background_color: `#ffffff`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `content/assets/icon_code-cooking.png`,
            },
        },
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-twitter`,
    ],
}
