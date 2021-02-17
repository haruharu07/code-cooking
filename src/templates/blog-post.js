import React from "react"
import { graphql } from "gatsby"
import styled from 'styled-components'

import responsive from '../styles/responsive'
import markdownStyle from "../styles/markdown"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/hero"
import LatestPosts from "../components/latest-posts"
import twemoji from "twemoji"

const BlogPostTemplate = ({ data, location }) => {
    const siteTitle = data.site.siteMetadata?.title || `Title`
    const latestPosts = data.latest.nodes
    const post = data.markdownRemark
    const { title, description, category } = post.frontmatter

    const emoji = twemoji.parse(post.frontmatter.emoji || "😎", {
        folder: "svg",
        ext: ".svg"
    });

    const latestEmoji = twemoji.parse( "🥘", {
        folder: "svg",
        ext: ".svg"
    });

    return (
        <Layout location={location} title={siteTitle}>
        <SEO
            title={title}
            description={description || post.excerpt}
        />

            <Hero emoji={emoji} post={post} slug={category} />
            <ContentWrapper>
                <ContentMain>
                    <PostContent dangerouslySetInnerHTML={{ __html: post.html }} />
                    <hr className="end-point" />
                </ContentMain>
                <ContentWidget>
                    <WidgetTitle><WidgetIcon dangerouslySetInnerHTML={{ __html: latestEmoji }} />さいきんのレシピ</WidgetTitle>
                    <LatestPosts latestPosts={latestPosts} location={location} />
                </ContentWidget>
            </ContentWrapper>
        </Layout>
    )
}

export default BlogPostTemplate

const ContentWrapper = styled.div`
    max-width: 880px;
    margin: 0 auto;
    padding: 0 40px;
    position: relative;
    ${responsive.xlg} {
        padding: 0 30px;
    }
    ${responsive.md} {
        padding: 0 20px;
    }
`

const ContentMain = styled.div`
    margin-bottom: 70px;
    ${markdownStyle}
    ${responsive.sm} {
        margin-bottom: 60px;
    }
`

const PostContent = styled.div``

const ContentWidget = styled.div`
    .item-link {
        display: flex;
        align-items: center;
        border-left: 4px solid ${props => props.theme.colors.accent};
        background-color: #fffdfd;
        padding: 10px;
        box-shadow: 0 2px 5px rgba(113, 51, 32, 0.12);
    }
`

const WidgetTitle = styled.h2`
    font-size: 28px;
    text-align: center;
    margin-bottom: 40px;
    ${responsive.sm} {
        font-size: 24px;
        margin-bottom: 30px;
    }
`

const WidgetIcon = styled.span`
    display: block;
    width: 60px;
    margin: 0 auto 20px;
`

export const pageQuery = graphql`
    query BlogPostBySlug(
        $id: String!
    ) {
        site {
            siteMetadata {
                title
            }
        }
        latest: allMarkdownRemark (filter: {frontmatter: {category: {eq: "recipe"}}}, sort: { fields: [frontmatter___date], order: DESC }, limit: 2) {
            nodes {
                fields {
                    slug
                }
                frontmatter {
                    title
                    emoji
                    description
                }
            }
        }
        markdownRemark(id: { eq: $id }) {
            id
            excerpt(pruneLength: 160)
            html
            frontmatter {
                title
                date(formatString: "YYYY.MM.DD")
                emoji
                description
                category
            }
        }
    }
`
