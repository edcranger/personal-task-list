import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

//components
import Notification from "../Notifications";
import { Menu, MenuItem } from "../Menu";

//icons
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { BiUserCircle, BiBell } from "react-icons/bi";
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
  NotificationNumber,
  NavMobileLink,
  NavButton,
} from "./NavbarElements";

//context
import AuthContext from "../../context/auth/authContext";
import ContributorContext from "../../context/contributors/contributorContext";
import NotificationsContext from "../../context/notifications/notificationsContext";

//Hooks
import useClickOutside from "../../Hooks/useClickOutside";

const Navbar = ({ title }) => {
  const [click, setClick] = useState(false);
  const [showUserdropdownMenu, setShowUserdropdownMenu] = useState(false);
  const [showNotification, setShownotification] = useState(false);

  const history = useHistory();

  const handleClick = () => setClick(!click);

  const { user, logout, loadUser } = useContext(AuthContext);

  const {
    notifications,
    notificationCount,
    SeeAllNotifications,
    getNotifications,
  } = useContext(NotificationsContext);

  const handleLogout = () => {
    logout();
    history.push("/login");
  };

  const clickNotificationButton = () => {
    setShownotification(!showNotification);
    SeeAllNotifications({ type: "see-all" });
  };

  const clickOutsideUserdropdownMenu = useClickOutside(() => {
    setShowUserdropdownMenu(false);
  });

  const clickOutsideNotification = useClickOutside(() => {
    setShownotification(false);
  });

  useEffect(() => {
    loadUser();
    getNotifications();
    return () => {};
  }, [loadUser]);

  useEffect(() => {}, []);

  return (
    <Wrapper>
      <Content>
        <NavbarLogo to="/">
          <NavbarLogoIcon />
          <h1>{title}</h1>
        </NavbarLogo>

        {/* <MenuIcon onClick={handleClick}>
          {click ? <FaTimes /> : <GiHamburgerMenu />}
        </MenuIcon> */}

        <NavMenu active={click ? true : false}>
          <NavItem ref={clickOutsideNotification}>
            <NavButton onClick={clickNotificationButton}>
              <BiBell className="navIcon" />
              {notificationCount ? (
                <NotificationNumber>{notificationCount}</NotificationNumber>
              ) : null}{" "}
              <NavMobileLink>Notifications</NavMobileLink>
            </NavButton>

            <Menu showMenu={showNotification} background="var(--white)">
              {notifications ? <Notification /> : null}
            </Menu>
          </NavItem>

          <NavItem>
            <NavLink to="/">
              <RiDashboardFill className="navIcon" />
              <NavMobileLink>Dashboard</NavMobileLink>
            </NavLink>
          </NavItem>

          <NavItem ref={clickOutsideUserdropdownMenu}>
            <NavButton
              onClick={() => setShowUserdropdownMenu(!showUserdropdownMenu)}
            >
              <BiUserCircle className="navIcon" />
              <NavMobileLink>Account</NavMobileLink>
            </NavButton>

            <Menu showMenu={showUserdropdownMenu} background="var(--white)">
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
