import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

//icons
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { BiUserCircle } from "react-icons/bi";
import { HiOutlineLogout } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";

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
  NavButton,
} from "./NavbarElements";

import { Menu, MenuItem } from "../Menu";

//context
import AuthContext from "../../context/auth/authContext";

import useClickOutside from "../../Hooks/useClickOutside";

const Navbar = ({ title }) => {
  const [click, setClick] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const history = useHistory();

  const handleClick = () => setClick(!click);

  const { user, logout, loadUser } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    history.push("/login");
  };

  const clickoutside = useClickOutside(() => {
    setShowMenu(false);
  });

  useEffect(() => {
    loadUser();
    return () => {};
  }, [loadUser]);

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
          <NavItem ref={clickoutside}>
            <NavButton onClick={() => setShowMenu(!showMenu)}>
              <BiUserCircle className="navIcon" />
              <NavMobileLink>Account</NavMobileLink>
            </NavButton>

            <Menu showMenu={showMenu}>
              <MenuItem>
                <BiUserCircle />
                {user && <span>{user.full_name}</span>}
              </MenuItem>
              <MenuItem>
                <FiSettings />
                Settings
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <HiOutlineLogout />
                Logout
              </MenuItem>
            </Menu>
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
