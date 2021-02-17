import React from "react"
import { StaticQuery, graphql } from "gatsby"
import styled from 'styled-components'

import theme from '../styles/theme'
import responsive from '../styles/responsive'

const Hero = ({ emoji, post, slug }) => {
    if (!slug) return null

    return (
        <StaticQuery
            query={categoryQuery}
            render={data => {
                const { categories } = data.site.siteMetadata
                const categoryObject = categories.find(cat => {
                return cat.slug === slug
                })
                const categoryColor = categoryObject ? categoryObject.color : "#F76D43"
                const content = (
                    <HeroWrapper>
                        <HeroItem
                            style={{
                                backgroundColor: categoryColor
                            }}
                        >
                            <HeroImage dangerouslySetInnerHTML={{ __html: emoji }} />
                            <Title>{post.frontmatter.title}</Title>
                        </HeroItem>
                    </HeroWrapper>
                )
                return (
                    <>
                    { content }
                    </>
                )
            }}
        />
    )
}

export default Hero

const HeroWrapper = styled.div`
    max-width: ${props => theme.sizes.maxWidth};
    margin: 0 auto;
    padding: 0 40px;
    ${responsive.xlg} {
        padding: 0 30px;
    }
    ${responsive.md} {
        padding: 0;
    }
`

const HeroItem = styled.div`
    width: 100%;
    min-height: 250px;
    border-radius: 5px;
    padding: 30px 10px 20px;
    margin-bottom: 50px;
    ${responsive.md} {
        border-radius: 0;
    }
    ${responsive.sm} {
        min-height: 195px;
        margin-bottom: 30px;
    }
`

const HeroImage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 120px;
    margin: 0 auto 20px;
    img {
        max-width: 100%;
        max-height: 100%;
    }
    ${responsive.sm} {
        width: 80px;
        height: 80px;
    }
`

const Title = styled.h1`
    font-size: 30px;
    line-height: 1.3;
    text-align: center;
    color: #fff;
    ${responsive.sm} {
        font-size: 26px;
    }
`

const categoryQuery = graphql`
    query categoryQuery {
        site {
            siteMetadata {
                categories {
                    slug
                    color
                }
            }
        }
    }
`;