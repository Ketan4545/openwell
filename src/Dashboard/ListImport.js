import * as React from "react";
import { useEffect, useState } from "react";
import { styled, useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ListItemButton from "@mui/material/ListItemButton";
import InputBase from "@mui/material/InputBase";
import ButtonBase from "@mui/material/ButtonBase";

import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckIcon from "@mui/icons-material/Check";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";

import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";

import {
  useNavigate,
  BrowserRouter,
  Link,
  Route,
  Routes,
  Outlet
} from "react-router-dom";
import axios from "axios";

import HomeIcon from "@mui/icons-material/Home";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import WavesIcon from "@mui/icons-material/Waves";
import WaterIcon from "@mui/icons-material/Water";
import BarChartIcon from "@mui/icons-material/BarChart";
import FilterHdrIcon from "@mui/icons-material/FilterHdr";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import AssessmentIcon from "@mui/icons-material/Assessment";
import WidgetsIcon from "@mui/icons-material/Widgets";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import WorkspacesIcon from "@mui/icons-material/Workspaces";
import ViewCozyIcon from "@mui/icons-material/ViewCozy";
import LensBlurIcon from "@mui/icons-material/LensBlur";
import { withEmotionCache } from "@emotion/react";
import QueueIcon from "@mui/icons-material/Queue";
import ViewCompactAltIcon from "@mui/icons-material/ViewCompactAlt";
import SummarizeIcon from "@mui/icons-material/Summarize";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckCircle from "@mui/icons-material/CheckCircle";
import SailingIcon from "@mui/icons-material/Sailing";

import { useLocation } from "react-router-dom";

import HvacIcon from "@mui/icons-material/Hvac";

import Sqlrun from "../Sql/Sqlrun";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import Report from "../Report/Report";
import Reportone from "../Report/ReportOne";
import Create from "../Chart/Create";
import Update from "../Report/Update";
import Chart from "../Chart/Chart";
import ChartCreate from "../Chart/Create";
import Space from "../Space/Space";
import Base from "../Space/Base";
import SpaceCreate from "../Space/Space";
import SpaceUpdate from "../Space/Space";
import { LocalAtm } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: "hidden"
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`
  }
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme)
  })
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  display: { xs: "none", md: "flex" },
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginRight: theme.spacing(1),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("xs")]: {
    marginLeft: theme.spacing(3),
    width: "auto"
  }
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  position: "relative",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(0)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "18ch"
    }
  }
}));

export default function MiniDrawer() {
  const theme = useTheme();
  let location = useLocation();
  //console.log(location.pathname);
  const [open, setOpen] = React.useState(false);
  const [nav, setNav] = React.useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const payload = {
      data: "select name from Workspace"
    };

    axios
      .post(`https://sql-dash-backend.herokuapp.com/sqlrun`, payload)
      .then((res) => {
        console.log(res.data.rows);

        if (Object.keys(res.data).length != 0) {
          setNav(res.data.rows);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [openA, setOpenA] = React.useState(true);

  const handleClick = () => {
    setOpenA(!openA);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  function Websitenavigate() {
    handleMenuClose();
    window.open("http://www.profifyme.com/", "_blank");
  }

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={handleMenuClose}
        component={Link}
        to=" Dashboard/myaccount"
      >
        My account
      </MenuItem>
      <MenuItem component={Link} to="/logout">
        Log out
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
          href="mailto:gaikwadketan701.com?subject=Support%20Regarding%20-"
        >
          <ContactSupportIcon />
        </IconButton>
        <p>Support</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  function FindNext() {
    var str = document.getElementById("findInput").value;
    if (str == "") {
      alert("Please enter some text to search!");
      return;
    }

    if (window.find) {
      // Firefox, Google Chrome, Safari
      var found = window.find(str);
      if (!found) {
        alert("The following text was not found:\n" + str);
      }
    } else {
      alert("Your browser does not support this example!");
    }
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" })
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div">
            SQL-Dash
          </Typography>
          {/*<Search sx={{ display: { xs: "none", md: "flex" } }}>
            <StyledInputBase
              type="text"
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              id="findInput"
            />
            <IconButton
              color="inherit"
              onClick={FindNext}
              sx={{ position: "relative" }}
            >
              <SearchIcon />
            </IconButton>
          </Search> */}

          {/* <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              href="mailto:gaikwadketan701@gmail.com?subject=Support%20Regarding%20-"
            >
              <ContactSupportIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box> */}
        </Toolbar>
      </AppBar>
      {/* {renderMobileMenu}
      {renderMenu} */}

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem
            button
            component={Link}
            to="/sqlrun"
            selected={location.pathname == "/sqlrun" ? true : false}
          >
            <ListItemIcon>
              <WidgetsIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Query" />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/report"
            selected={location.pathname == "/report" ? true : false}
          >
            <ListItemIcon>
              <SummarizeIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Report" />
          </ListItem>

          {/* <ListItem
            button
            component={Link}
            to="/chart"
            selected={location.pathname == "/chart" ? true : false}
          >
            <ListItemIcon>
              <BarChartIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Chart" />
          </ListItem> */}

          {nav.map((row, index) => (
            <ListItem
              key={row.name}
              button
              component={Link}
              to={"/" + row.name}
              selected={location.pathname == "/" + { row } ? true : false}
            >
              <ListItemIcon>
                <Avatar
                  alt="Workspace"
                  sx={{ width: 24, height: 24, bgcolor: "#3f50b5" }}
                >
                  {row.name.charAt(0).toLowerCase()}
                </Avatar>
              </ListItemIcon>
              <ListItemText primary={row.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, pr: 5, pl: 5, pb: 5, width: "95%" }}
      >
        <DrawerHeader />

        <Routes>
          <Route exact path="sqlrun" element={<Sqlrun />} />

          <Route exact path="report" element={<Report />}>
            <Route exact path=":name" element={<Reportone />} />
            <Route exact path="create" element={<Create />} />
            <Route exact path=":name/update" element={<Update />} />
          </Route>

          {/* <Route exact path="chart" element={<Chart />}>
            <Route exact path=":name" element={<Reportone />} />
            <Route exact path="create" element={<ChartCreate />} />
            <Route exact path=":name/update" element={<Update />} />
          </Route> */}

          <Route exact path=":name" element={<Base />}>
            <Route exact path=":id" element={<Space />} />
            <Route exact path="create" element={<SpaceCreate />} />
            <Route exact path=":id/update" element={<SpaceUpdate />} />
          </Route>
        </Routes>
      </Box>
    </Box>
  );
}
