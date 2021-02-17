const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions

    const result = await graphql(
        `
        {
            allMarkdownRemark(
                sort: { fields: [frontmatter___date], order: DESC }
                limit: 1000
            ) {
                nodes {
                    id
                    fields {
                        slug
                    }
                    frontmatter {
                        date(formatString: "YYYY.MM.DD")
                        title
                        description
                        emoji
                        category
                    }
                }
            }
        }
        `
    )

    if (result.errors) {
        reporter.panicOnBuild(
        `There was an error loading your blog posts`,
        result.errors
        )
        return
    }

    const posts = result.data.allMarkdownRemark.nodes

    // Create category posts pages
    let categories = [];
    posts.forEach(post => {
        if (post.frontmatter.category) {
            categories.push(post.frontmatter.category);
        }
        });
        categories = new Set(categories);
        categories.forEach(category => {
        createPage({
            path: `/basics/`,
            component: path.resolve("src/templates/categories.js"),
            context: {
                category
            }
        });
    });

    const blogPost = path.resolve(`./src/templates/blog-post.js`)

    posts.forEach((post) => {
        createPage({
                path: post.fields.slug,
                component: blogPost,
                context: {
                    id: post.id,
                },
            })
        })

}

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions

    if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
            name: `slug`,
            node,
            value,
        })
    }
}