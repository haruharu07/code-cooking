import { createGlobalStyle } from 'styled-components'

const globalStyle = createGlobalStyle`
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        vertical-align: baseline;
        -webkit-tap-highlight-color:rgba(0,0,0,0);
    }
    html, body {
        height: 100%;
    }
    body {
        font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Hiragino Kaku Gothic ProN', Arial,'Helvetica Neue','メイリオ', 'Meiryo',sans-serif;
        font-size: 18px;
        line-height: 1.75;
        background-color: ${props => props.theme.colors.background};
        color: ${props => props.theme.colors.base};
        position: relative;
        overflow: scroll;
    }
    body.typesquare_option {
        visibility: visible;
    }
    .noscroll {
        overflow: hidden;
    }
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    a {
        text-decoration: none;
        transition: all .5s;
        box-shadow: none;
        color: inherit;
        outline-color: #111;
        :hover {
            opacity: .9;
            transition: all .3s;
            outline: none;
        }
    }
    h1, h2, h3, h4, h5, h6 {
        font-weight: 700;
        line-height: 1.3;
    }
    ol, ul, li {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote::before, blockquote::after,
    q::before, q::after {
    content: '';
    content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    * {
        box-sizing: border-box;
    }
    img {
        max-width: 100%;
        vertical-align: top;
    }
    button,
    input,
    textarea {
        font-family: inherit;
        font-size: inherit;
        color: inherit;
        background: none;
        border: none;
        outline: none;
        appearance: none;
        border-radius: 0;
        resize: none;
        outline-color: #111;
    }

`

export default globalStyle