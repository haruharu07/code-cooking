import React from "react"
import styled, { ThemeProvider } from "styled-components"

import GlobalStyle from '../styles/global'
import theme from '../styles/theme'
import responsive from '../styles/responsive'

import "prismjs/themes/prism-tomorrow.css"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"

import Header from "./header"
import Footer from "./footer"

const Layout = ({ location, children }) => {

    const rootPath = `${__PATH_PREFIX__}/`

    let content;
    if(location.pathname === rootPath || location.pathname === "/basics") {
        content = <ContentHome><main>{children}</main></ContentHome>
    } else {
        content = <ContentPage><main>{children}</main></ContentPage>
    }

    return (
        <ThemeProvider theme={theme}>
        <>
        <GlobalStyle />
        <Header location={location}/>
        {content}
        <Footer />
        </>
        </ThemeProvider>
    )
}

export default Layout

const ContentHome = styled.div`
    min-height: 90vh;
    margin: 50px 0 100px;
    ${responsive.md} {
            margin: 35px 0 100px;
    }
`

const ContentPage = styled.div`
    min-height: 90vh;
    margin: 50px 0 120px;
    ${responsive.md} {
            margin: 0 0 100px;
    }
`