import React from "react"
import styled from "styled-components"

const Footer = () => {
    return (
        <GlobalFooter>
            <FooterInner>
                <IconList>
                    <IconItem>
                        <a href="https://github.com/haruharu07" target="_blank" rel="noopener noreferrer">
                            <svg width="22" height="22" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.99375 0.1922C3.12969 0.190638 0 3.31876 0 7.1797C0 10.2328 1.95781 12.8281 4.68437 13.7813C5.05156 13.8734 4.99531 13.6125 4.99531 13.4344V12.2234C2.875 12.4719 2.78906 11.0688 2.64687 10.8344C2.35937 10.3438 1.67969 10.2188 1.88281 9.98439C2.36562 9.73595 2.85781 10.0469 3.42812 10.8891C3.84062 11.5 4.64531 11.3969 5.05312 11.2953C5.14219 10.9281 5.33281 10.6 5.59531 10.3453C3.39844 9.95157 2.48281 8.61095 2.48281 7.0172C2.48281 6.24376 2.7375 5.53283 3.2375 4.95939C2.91875 4.01408 3.26719 3.2047 3.31406 3.08439C4.22188 3.00314 5.16562 3.73439 5.23906 3.7922C5.75469 3.65314 6.34375 3.5797 7.00313 3.5797C7.66563 3.5797 8.25625 3.65626 8.77656 3.79689C8.95313 3.66251 9.82812 3.03439 10.6719 3.11095C10.7172 3.23126 11.0578 4.02189 10.7578 4.9547C11.2641 5.5297 11.5219 6.24689 11.5219 7.02189C11.5219 8.61876 10.6 9.96095 8.39688 10.3484C8.58558 10.534 8.73541 10.7553 8.83763 10.9995C8.93984 11.2436 8.99238 11.5057 8.99219 11.7703V13.5281C9.00469 13.6688 8.99219 13.8078 9.22656 13.8078C11.9938 12.875 13.9859 10.261 13.9859 7.18126C13.9859 3.31876 10.8547 0.1922 6.99375 0.1922V0.1922Z" fill="#999999"/>
                            </svg>
                        </a>
                    </IconItem>
                </IconList>
                <Copyright>
                    © {new Date().getFullYear()}, Code Cooking
                </Copyright>
            </FooterInner>
        </GlobalFooter>
    )
}

export default Footer

const GlobalFooter = styled.footer``

const FooterInner = styled.div`
    background-color: ${props => props.theme.colors.base};
    padding: 32px 0 30px;
`

const IconList = styled.ul`
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
`

const IconItem = styled.li`
    &:not(:last-child) {
        margin-right: 10px;
    }
    a {
        display: block;
        line-height: 1;
    }
`

const Copyright = styled.p`
    color: #999;
    text-align: center;
`