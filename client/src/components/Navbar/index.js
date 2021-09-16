import React, { useState } from "react";
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
  NavMobileLink,
} from "./NavbarElements";

const Navbar = ({ title }) => {
  const [click, setClick] = useState(false);
  /*   const [button, setButton] = useState(false); */

  const handleClick = () => setClick(!click);

  /*   const showButton = () => {
    window.innerWidth <= 960 ? setButton(false) : setButton(true);
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);
 */
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
              <RiDashboardFill className="navIcon" />
              <NavMobileLink>Dashboard</NavMobileLink>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/tasks">
              <BiUserCircle className="navIcon" />
              <NavMobileLink>Account</NavMobileLink>
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
