import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

//icons
import { BiTask } from "react-icons/bi";

export const Wrapper = styled.nav`
  background: rgb(0, 153, 255);
  padding: 0 20px;
  position: sticky;
  z-index: 999;
  top: 0;
  display: column;
  align-items: center;
`;

export const Content = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  color: var(--white);
  max-width: var(--maxWidth);
  height: 80px;
`;

export const NavbarLogo = styled(Link)`
  width: 200px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: var(--white);
  text-decoration: none;

  :hover {
    color: #006bb3;
    transition: all 0.3s ease-in;
  }
`;

export const NavbarLogoIcon = styled(BiTask)`
  font-size: 2rem;
  margin-bottom: 3px;
`;

export const MenuIcon = styled.div`
  display: none;

  /*   @media screen and (max-width: 640px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
  } */
`;

export const NavMenu = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-gap: 10px;
  list-style: none;
  text-align: center;
  padding: 0;

  /*   @media screen and (max-width: 640px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: absolute;
    top: 60px;
    left: -100%;
    opacity: 1;
    transition: all 0.5s ease;
    height: 90vh;
    ${({ active }) =>
    active &&
    css`
      background: #242222;
      left: 0;
      opacity: 1;
      transition: all 0.5s ease;
      z-index: 1;
    `}
  } */
`;

export const NavItem = styled.li`
  height: 80px;
  position: relative;
`;

export const NotificationNumber = styled.div`
  position: absolute;
  right: 5px;
  top: 15px;
  width: 25px;
  padding: 2px;
  font-size: 15px;
  border-radius: 50%;
  background: var(--danger);
`;

export const NavButton = styled.div`
  color: var(--white);
  display: flex;
  align-items: center;
  text-decoration: none;
  height: 100%;
  font-size: var(--fontMed);
  padding: 0.5rem 1rem;
  width: 100%;

  :hover {
    color: #006bb3;
    transition: all 0.3s ease-in;
    border-bottom: 4px solid #006bb3;
  }

  /*   @media screen and (max-width: 640px) {
    text-align: center;
    padding: 2rem;
    max-width: 100%;
    width: 100%;
    display: table;

    .navIcon {
      display: none;
    }

    :hover {
      background-color: #fff;
      color: #242424;
      border-radius: 0;
      border-bottom: none;
    }
  } */
`;

export const NavLink = styled(Link)`
  color: var(--white);
  display: flex;
  align-items: center;
  text-decoration: none;
  height: 100%;
  font-size: var(--fontMed);
  padding: 0.5rem 1rem;
  width: 100%;

  :hover {
    color: #006bb3;
    transition: all 0.3s ease-in;
    border-bottom: 4px solid #006bb3;
  }

  /*   @media screen and (max-width: 640px) {
    text-align: center;
    padding: 2rem;
    max-width: 100%;
    width: 100%;
    display: table;

    .navIcon {
      display: none;
    }

    :hover {
      background-color: #fff;
      color: #242424;
      border-radius: 0;
      border-bottom: none;
    }
  } */
`;

export const NavMobileLink = styled.div`
  display: none;

  /*   @media screen and (max-width: 640px) {
    display: inline;
  } */
`;
