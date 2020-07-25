/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  AppBar,
  Avatar,
  Badge,
  Button,
  IconButton,
  Toolbar,
  Hidden,
  colors,
  Typography,
  Tooltip,
  Input,
  Popper,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ClickAwayListener,
} from '@material-ui/core';

//Icons
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import PostAddIcon from '@material-ui/icons/PostAdd';
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';

//Components
import userImage from '../images/icon.png';
import axios from '../util/axios';
import useRouter from '../util/useRouter';
import NavbarButton from '../util/NavbarButton';


const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
  },
  toolbar: {
    width: '70%',
    margin: '0 auto'
  },
  logoIcon: {
    color: '#fff',
    fontWeight: 'bold'
  },
  flexGrow: {
    flexGrow: 1
  },
  notificationsButton: {
    marginLeft: theme.spacing(1),
    color: '#fff'
  },
  notificationsBadge: {
    backgroundColor: colors.orange[600]
  },
  logoutButton: {
    marginLeft: theme.spacing(1)
  },
  logoutIcon: {
    marginRight: theme.spacing(1)
  },
  search: {
    margin: theme.spacing(1, 3),
    color: '#000',
    backgroundColor: '#FFF',
    minWidth: 500,
    borderRadius: 4,
    flexBasis: 300,
    height: 35,
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  searchIcon: {
    color: 'inherit'
  },
  searchInput: {
    flexGrow: 1,
    color: 'inherit',
    '& input::placeholder': {
      opacity: 1,
      color: 'inherit'
    }
  },
  searchPopper: {
    minWidth: 500,
    zIndex: theme.zIndex.appBar + 100
  },
  searchPopperContent: {
    marginTop: theme.spacing(0.1),
  },
  searchPopperListItem: {
    height: theme.spacing(4.5),
  }
}));

const Navbar = (props) => {
  const { authenticated } = props;
  const currentUser = "Stabja";
  const classes = useStyles();
  const { history } = useRouter();
  const notificationsRef = useRef(null);
  const searchRef = useRef(null);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openSearchPopover, setOpenSearchPopover] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  

  const handleLogout = () => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    history.push('/login');
    //window.location.href = '/login';
  }


  const handleNotificationsOpen = () => {
    setOpenNotifications(true);
  };

  const handleNotificationsClose = () => {
    setOpenNotifications(false);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    if (event.target.value) {
      if (!openSearchPopover) {
        setOpenSearchPopover(true);
      }
    } else {
      setOpenSearchPopover(false);
    }
  };

  const handleSearchPopverClose = () => {
    setOpenSearchPopover(false);
  };


  const signupIcon = (
    <NavbarButton key="Signup" tip="Signup" link="/signup" btnClassName={classes.notificationsButton}>
      <PersonAddIcon fontSize="large" />
    </NavbarButton>
  );

  const loginIcon = (
    <NavbarButton key="Login" tip="Login" link="/login" btnClassName={classes.notificationsButton}>
      <LockOpenIcon fontSize="large" />
    </NavbarButton>
  );

  const restaurantIcon = (
    <NavbarButton key="Restaurant" tip="Restaurant" link="/" btnClassName={classes.notificationsButton}>
      <RestaurantIcon fontSize="large" />
    </NavbarButton>
  );

  const newArticleIcon = (
    <NavbarButton key="NewArticle" tip="NewArticle" link="/newarticle" btnClassName={classes.notificationsButton}>
      <PostAddIcon fontSize="large" />
    </NavbarButton>
  );

  const settingsIcon = (
    <NavbarButton key="Settings" tip="Settings" link="/settings" btnClassName={classes.notificationsButton}>
      <SettingsIcon fontSize="large" />
    </NavbarButton>
  );

  const signoutIcon = (
    <NavbarButton key="Logout" tip="Logout" link="/login" btnClassName={classes.logoutButton} onClick={handleLogout}>
      <ExitToAppIcon fontSize="large" />
    </NavbarButton>
  );

  const notifictionIcon = (
    <Tooltip key="notifictionIcon" title="Notifications" aria-label="add">
      <IconButton
        className={classes.notificationsButton}
        color="inherit"
        onClick={handleNotificationsOpen}
        ref={notificationsRef}
      >
        <Badge
          badgeContent={4}
          classes={{ badge: classes.notificationsBadge}}
        >
          <NotificationsIcon fontSize="large" />
        </Badge>
      </IconButton>
    </Tooltip>
  );

  const userProfile = (
    <Link
      key={currentUser}
      to={`/profile/${currentUser}/myarticles`}
    >
      <Button
        key={currentUser}
        className={classes.logoutButton}
        color="inherit"
      >
        <Avatar 
          alt={currentUser} 
          src={userImage}
          className={classes.logoutIcon} 
        />
        {currentUser}
      </Button>
    </Link>
  );
  

  const loggedOutIconTray = ([
    restaurantIcon,
    signupIcon,
    loginIcon
  ]);

  const loggedInIconTray = ([
    restaurantIcon,
    settingsIcon,
    notifictionIcon,
    userProfile,
    signoutIcon
  ]);

  const popularSearches = [
    'Devias React Dashboard',
    'Devias',
    'Admin Pannel',
    'Project',
    'Pages'
  ];


  return (
    <AppBar
      className={classes.root}
      color="primary"
    >
      <Toolbar className={classes.toolbar}>
        <div>
          <Typography
            className={classes.logoIcon}
            component="h1"
            variant="h3"
          >
            RAMENTAURANTS
          </Typography>
        </div>
        <div
          className={classes.search}
          ref={searchRef}
        >
          <Input
            className={classes.searchInput}
            disableUnderline
            onChange={handleSearchChange}
            placeholder="Search for Restaurants"
            value={searchValue}
          />
          <SearchIcon
            fontSize="large"
            className={classes.searchIcon} 
          />
        </div>
        <Popper
          anchorEl={searchRef.current}
          className={classes.searchPopper}
          open={openSearchPopover}
          transition
        >
          <ClickAwayListener onClickAway={handleSearchPopverClose}>
            <Paper
              className={classes.searchPopperContent}
              elevation={1}
            >
              <List>
                {popularSearches.map(search => (
                  <ListItem
                    button
                    className={classes.searchPopperListItem}
                    key={search}
                    onClick={handleSearchPopverClose}
                  >
                    <ListItemText primary={search}  />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </ClickAwayListener>
        </Popper>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          {authenticated === true ? loggedInIconTray : loggedOutIconTray}
        </Hidden>
        <Hidden lgUp>
          {authenticated === true ? loggedInIconTray : loggedOutIconTray}
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  className: PropTypes.string,
  onOpenNavBarMobile: PropTypes.func
};

export default Navbar;
