import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import responsive from '../styles/responsive'

import Layout from "../components/layout"
import SEO from "../components/seo"
import Container from "../components/container"
import PostCard from "../components/post-card"
import CategoryMenu from "../components/category-menu"

const BlogIndex = ({ data, location }) => {

    const siteTitle = data.site.siteMetadata?.title || `Title`
    const recipePosts = data.recipe.nodes

    return (
        <Layout location={location} title={siteTitle}>
        <SEO title="" />
            <Container>
                <CategoryMenu location={location} />
                <RecipeItem>
                    <ItemGrid>
                        {recipePosts.map(post => {
                            return (
                                <PostCard post={post} />
                            )
                        })}
                    </ItemGrid>
                </RecipeItem>
            </Container>
        </Layout>
    )
}

export default BlogIndex

const RecipeItem = styled.div``

const ItemGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    .item-link {
        display: block;
        background-color: #F76D43;
        border-radius: 8px;
        padding: 32px 20px 30px;
        color: #fff;
        text-align: center;
        box-shadow: 0 2px 5px rgba(113, 51, 32, 0.12);
    }
    ${responsive.sm} {
        grid-template-columns: 1fr;
        gap: 20px;
    }
`

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        recipe: allMarkdownRemark(filter: {frontmatter: {category: {eq: "recipe"}}}, sort: {order: DESC, fields: frontmatter___date}) {
            nodes {
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
