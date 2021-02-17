import { css } from "styled-components"
import responsive from '../styles/responsive'

import pen from "../../content/assets/pen.svg"

const markdownStyle = css`
    h2 {
        font-size: 28px;
        text-align: center;
        margin: 80px 0 40px;
        ${responsive.sm} {
            font-size: 24px;
            margin: 60px 0 30px;
        }
    }
    h2:first-of-type {
        margin-top: 58px;
        ${responsive.sm} {
            margin-top: 40px;
        }
    }
    h2::before {
        display: block;
        content: "";
        width: 60px;
        height: 60px;
        margin: 0 auto 20px;
        background: url(${pen}) no-repeat center / cover;
    }
    h3 {
        font-size: 22px;
        border-left: 4px solid ${props => props.theme.colors.base};
        padding: 3px 0 2px 10px;
        margin: 50px 0 22px;
        ${responsive.sm} {
            font-size: 20px;
            margin: 30px 0 15px;
        }
    }
    ol {
        list-style: decimal;
    }
    ul {
        list-style: disc;
    }
    ol,ul {
        padding-left: 1em;
    }
    li {
        list-style: inherit;
    }
    p {
        white-space: pre-wrap;
        ${responsive.sm} {
            font-size: 16px;
        }
    }
    p {
        margin-bottom: 1.5em;
    }
    a {
        color: #F76D43;
        text-decoration: underline;
    }
    .gatsby-resp-image-wrapper {
        margin: 1em 0px;
        border: 1px solid rgb(229, 232, 234);
        box-shadow: rgb(0 0 0 / 25%) 0px 2px 5px -1px;
        border-radius: 4px;
        overflow: hidden;
    }
    .language-text {
        background: #f0f5f9;
        color: #000;
        border: 1px solid #e6edf3;
        padding: 2px 5px;
    }
    .note .language-text {
        background: #ffecb3;
        border: 1px solid #ffdc73;
    }
    .tech .language-text {
        background: #d2ebff;
        border: 1px solid #b9dffd;
    }
    .do .language-text {
        background: #9bffae;
        border: 1px solid #61ff7e;
    }
    .note p,
    .tech p,
    .do p {
        margin-bottom: 0;
    }
    hr {
        height: 16px;
        background-image: radial-gradient(rgba(153, 153, 153, 1) 30%,transparent 33%), radial-gradient(rgba(153, 153, 153, 1) 30%,transparent 33%);
        background-size: 16px 16px;
        border: none;
        margin: 80px 0 0;
        ${responsive.sm} {
            margin: 60px 0 0;
        }
    }
    /*コードブロック*/
    .gatsby-highlight {
        margin: 0 0 23px 0;
        ${responsive.sm} {
            font-size: 16px;
        }
    }
    .gatsby-code-title {
        background: #2e96b5;
        color: #eee;
        padding: 6px 12px;
        font-size: 0.8em;
        line-height: 1;
        font-weight: bold;
        display: table;
        border-radius: 0 5px;
        margin: 0 0 -26px auto;
        position: relative;
    }
    pre {
        background-color: #2c2d3a;
        border-radius: 5px;
        margin: 0;
    }

    .code-frame .custom-block-body {
        width: 100%;
    }
    .code-frame .custom-block-body iframe {
        width: 100%;
        height: 500px;
        border: 1px solid #000;
        border-radius: 5px;
    }

    .note,
    .tech,
    .do {
        border-radius: 5px;
        padding: 1em 1em 1.2em;
        margin: 28px 0 28px;
    }
    .note {
        background-color: #fff4d2;
    }
    .tech {
        background-color: #e1f6ff;
    }
    .do {
        background-color: #ccffd6;
    }
    .note .custom-block-heading,
    .tech .custom-block-heading,
    .do .custom-block-heading {
        font-weight: 700;
        margin-bottom: 4px;
        ${responsive.sm} {
            font-size: 16px;
        }
    }
`

export default markdownStyle