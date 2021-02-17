import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

import ogp_image from '../../content/assets/default-ogp.png'

const SEO = ({ description, lang, meta, title }) => {
    const { site } = useStaticQuery(
        graphql`
        query {
            site {
            siteMetadata {
                title
                description
                siteUrl
            }
            }
        }
        `
    )

    const metaDescription = description || site.siteMetadata.description
    const defaultTitle = site.siteMetadata.title
    const defaultImage = `${site.siteMetadata.siteUrl}${ogp_image}`

    return (
        <Helmet
        htmlAttributes={{
            lang,
        }}
        defaultTitle = {defaultTitle}
        title={title}
        titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
        meta={[
            {
            name: `description`,
            content: metaDescription,
            },
            {
            property: `og:title`,
            content: title,
            },
            {
            property: `og:description`,
            content: metaDescription,
            },
            {
            property: `og:type`,
            content: `website`,
            },
            {
            property: `og:image`,
            content: defaultImage,
            },
            {
            name: `twitter:card`,
            content: `summary_large_image`,
            },
            {
            name: `twitter:creator`,
            content: site.siteMetadata?.social?.twitter || ``,
            },
            {
            name: `twitter:title`,
            content: title,
            },
            {
            name: `twitter:description`,
            content: metaDescription,
            },
        ].concat(meta)}
        />
    )
}

SEO.defaultProps = {
    lang: `en`,
    meta: [],
    description: ``,
}

SEO.propTypes = {
    description: PropTypes.string,
    lang: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string.isRequired,
}

export default SEO
