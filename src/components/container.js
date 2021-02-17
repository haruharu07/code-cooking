import React from 'react'
import styled from 'styled-components'

import theme from '../styles/theme'
import responsive from '../styles/responsive'

const Container = ({ children }) => {
    return <IndexContent>{ children }</IndexContent>
}

export default Container

const IndexContent = styled.div`
    max-width: ${props => theme.sizes.maxWidth};
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