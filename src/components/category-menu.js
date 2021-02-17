import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const NavItem = ({ navLink, path, name }) => {
    return (
        <NavLink className={navLink === path && "active"}>
            <Link to={ navLink }>
                {name}
            </Link>
        </NavLink>
    )
}

const CategoryMenu = ({ location }) => {

    const path = location.pathname

    return (
        <Nav>
            <NavList>
                <NavItem navLink="/" path={path} name="レシピ" />
                <NavItem navLink="/basics" path={path} name="きほん" />
            </NavList>
        </Nav>
    )
}

export default CategoryMenu

const Nav = styled.nav`
    margin-bottom: 60px;
    position: relative;
    &::after {
        display: block;
        content: "";
        width: 30px;
        height: 2px;
        background-color: #d0d0d0;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -28px;
        margin: auto;
    }
`

const NavList = styled.ul`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 300px;
    margin: 0 auto;
    background-color: #d0d0d0;
    border-radius: 10px;
    padding: 3px;
    a {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        border-radius: 8px;
        color: #999;
        font-weight: 700;
    }
    .active a {
        background-color: #fff;
    }
    li:nth-child(1).active a {
        color: #F76D43;
    }
    li:nth-child(2).active a {
        color: #36C1F7;
    }
`

const NavLink = styled.li`
    width: 49%;
`