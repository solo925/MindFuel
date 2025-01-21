import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { Button, Typography, Box } from "@mui/material";

const Header: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.login);
  const navigate = useNavigate();

  function handleNavigateToProfile(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    navigate('/profile');
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Good Morning, {user?.name || "Guest"}!
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Here's a quick look at your health data and habits.
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleNavigateToProfile}
          sx={{ borderRadius: 1 }}
        >
          Profile
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ borderRadius: 1 }}
        >
          Help
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
