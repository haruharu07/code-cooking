import React from "react"
import { graphql } from "gatsby"

import styled from "styled-components"
import twemoji from "twemoji"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Container from "../components/container"


const NotFoundPage = ({ data, location }) => {

    const siteTitle = data.site.siteMetadata.title
    const emoji = twemoji.parse("😎", {
                                folder: "svg",
                                ext: ".svg"
                            });

    return (
        <Layout location={location} title={siteTitle}>
        <SEO title="404: Not Found" />
            <Container>
                <Panel>
                    <PanelHero dangerouslySetInnerHTML={{ __html: emoji }} />
                    <Title>
                        PAGE NOT FOUND.
                    </Title>
                </Panel>
            </Container>
        </Layout>
    )
}

export default NotFoundPage

const Panel = styled.div`
    margin-top: 100px;
`

const PanelHero = styled.span`
    display: block;
    width: 100px;
    margin: 0 auto 20px;
`

const Title = styled.h1`
    font-size: 28px;
    text-align: center;
`

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
    }
`
