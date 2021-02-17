import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import twemoji from "twemoji"
import responsive from '../styles/responsive'

const RelatedPosts = ({ latestPosts, location }) => {

    return (
            <>
                <ItemGrid>
                    {latestPosts.map(latestPost => {
                        const emoji = twemoji.parse(latestPost.frontmatter.emoji || "😎", {
                            folder: "svg",
                            ext: ".svg"
                        });
                        if(location.pathname === latestPost.fields.slug){
                            return (
                                <a href={`${latestPost.fields.slug}#page_top`} className="item-link">
                                    <Hero dangerouslySetInnerHTML={{ __html: emoji }} />
                                    <CardTitle>{latestPost.frontmatter.title}</CardTitle>
                                </a>
                            )
                        } else {
                            return (
                                <Link to={latestPost.fields.slug} className="item-link">
                                    <Hero dangerouslySetInnerHTML={{ __html: emoji }} />
                                    <CardTitle>{latestPost.frontmatter.title}</CardTitle>
                                </Link>
                            )
                        }
                    })}
                </ItemGrid>
                {/* <More>
                    <Link to="/">すべてのレシピ</Link>
                </More> */}
                <More>
                    <Link to="/" className="more-recipe">すべてのレシピ</Link>
                    <Link to="/basics" className="more-basic">きほん</Link>
                </More>
            </>
    )
}

export default RelatedPosts

const ItemGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    ${responsive.sm} {
        grid-template-columns: 1fr;
        gap: 20px;
    }
`

const Hero = styled.div`
    width: 42px;
    margin-right: 10px;
`

const CardTitle = styled.h3`
    color: ${props => props.theme.colors.accent};
    ${responsive.sm} {
        font-size: 16px;
    }
`

const More = styled.div`
    margin-top: 50px;
    a {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
        margin: 0 auto;
        font-weight: 700;
        background-color: #fffdfd;
        border-radius: 30px;
        padding: 10px;
    }
    .more-recipe {
        color: ${props => props.theme.colors.accent};
        box-shadow: 0 2px 5px rgba(113, 51, 32, 0.12);
        margin-bottom: 25px
    }
    .more-basic {
        color: ${props => props.theme.colors.blue};
        box-shadow: 0 2px 5px rgba(23, 70, 88, 0.12);
    }
    ${responsive.sm} {
        a {
            font-size: 16px;
        }
        .more-recipe {
            margin-bottom: 15px
        }
    }
    ${responsive.sm} {
        margin-top: 35px;
    }
`