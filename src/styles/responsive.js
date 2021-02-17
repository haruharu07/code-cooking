const screenSize = {
    sm: "500px",
    md:"768px",
    lg: "920px",
    xlg: "1200px",
}

const responsive = {
    sm: `@media screen and (max-width: ${screenSize.sm})`,
    md: `@media screen and (max-width: ${screenSize.md})`,
    lg: `@media screen and (max-width: ${screenSize.lg})`,
    xlg: `@media screen and (max-width: ${screenSize.xlg})`,
}

export default responsive