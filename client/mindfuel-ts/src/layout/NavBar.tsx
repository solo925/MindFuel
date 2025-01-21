import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { logout } from "../reducers/loginReducer";
import { RootState } from "../store";

const Navbar: React.FC = () => {
  const isAuthenticated = Cookies.get("token");
  const dispatch = useDispatch();

  const { loading } = useSelector((state: RootState) => state.login);

  // Logout handler
  const onLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(logout());
  };

  // Guest Links
  const guestLinks = (
    <Box display="flex" gap={2}>
      <Button component={NavLink} to="/" color="primary" variant="text">
        Home
      </Button>
      <Button component={NavLink} to="/register" color="primary" variant="outlined">
        Register
      </Button>
      <Button component={NavLink} to="/login" color="primary" variant="contained">
        Login
      </Button>
    </Box>
  );

  // Authenticated Links
  const authLinks = (
    <Box display="flex" gap={2}>
      <Button component={NavLink} to="/goals" color="primary" variant="text">
        Goals
      </Button>
      <Button component={NavLink} to="/habits" color="primary" variant="text">
        Habits
      </Button>
      <Button component={NavLink} to="/profile" color="primary" variant="text">
        Profile
      </Button>
      <Button onClick={onLogout} color="secondary" variant="outlined">
        Logout
      </Button>
    </Box>
  );

  return (
    <AppBar position="fixed" color="inherit" elevation={1}>
      <Toolbar className="container mx-auto flex justify-between">
        {/* Branding */}
        <Typography variant="h6" color="primary">
          <Link to="/" className="text-blue-600 no-underline">
            MindFuel
          </Link>
        </Typography>

        {/* Navigation Links */}
        {!loading && <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
