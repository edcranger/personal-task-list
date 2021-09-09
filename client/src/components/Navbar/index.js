import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { BiUserCircle } from "react-icons/bi";

//styles
import {
  Wrapper,
  Content,
  NavbarLogo,
  NavbarLogoIcon,
  NavMenu,
  NavItem,
  NavLink,
  MenuIcon,
} from "./NavbarElements";

const Navbar = ({ title }) => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    window.innerWidth <= 960 ? setButton(false) : setButton(true);
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <Wrapper>
      <Content>
        <NavbarLogo to="/">
          <NavbarLogoIcon />
          <h1>{title}</h1>
        </NavbarLogo>

        <MenuIcon onClick={handleClick}>
          {click ? <FaTimes /> : <GiHamburgerMenu />}
        </MenuIcon>

        <NavMenu active={click ? true : false}>
          <NavItem>
            <NavLink to="/">
              <RiDashboardFill />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/tasks">
              <BiUserCircle />
            </NavLink>
          </NavItem>
        </NavMenu>
      </Content>
    </Wrapper>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: "TaskEd",
};

export default Navbar;
