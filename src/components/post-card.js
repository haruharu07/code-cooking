import React from "react"
import { Link } from "gatsby"
import styled from 'styled-components'
import twemoji from "twemoji"

const PostCard = ({ post }) => {
    const emoji = twemoji.parse(post.frontmatter.emoji || "😎", {
        folder: "svg",
        ext: ".svg"
    });
    return (
            <Link to={post.fields.slug} className="item-link">
                <Hero dangerouslySetInnerHTML={{ __html: emoji }} />
                <CardTitle>{post.frontmatter.title}</CardTitle>
            </Link>
    )
}

export default PostCard

const Hero = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    margin: 0 auto 18px;
    img {
        width: 100%;
        height: 100%;
    }
`

const CardTitle = styled.h2`
    font-size: 24px;
    line-height: 1.3;
`