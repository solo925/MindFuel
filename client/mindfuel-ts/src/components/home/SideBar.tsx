import React from "react";
import { FaCar, FaCog, FaMoon, FaShoppingCart, FaTint, FaUtensils } from "react-icons/fa";
import { Drawer, List, ListItem, ListItemText, Typography, Divider } from "@mui/material";

const Sidebar: React.FC = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          backgroundColor: "#f8fafc", // Light gray background
          borderRight: "1px solid #e5e7eb", // Border on right
          padding: 2,
        },
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          color: "#4f46e5", // Indigo color
          marginBottom: 3,
        }}
      >
        <span style={{ marginRight: 8 }}>🧠</span> MindFuel
      </Typography>

      <Divider sx={{ marginBottom: 2 }} />

      <List sx={{ padding: 0 }}>
        <ListItem sx={{ display: "flex", alignItems: "center" }} component="li" onClick={() => console.log("Home clicked")}>
          <FaShoppingCart style={{ marginRight: 16 }} />
          <ListItemText primary="Home" sx={{ color: "#4f46e5", fontWeight: "bold" }} />
        </ListItem>

        <ListItem sx={{ display: "flex", alignItems: "center" }} component="li" onClick={() => console.log("Meals clicked")}>
          <FaUtensils style={{ marginRight: 16 }} />
          <ListItemText primary="Meals" />
        </ListItem>

        <ListItem sx={{ display: "flex", alignItems: "center" }} component="li" onClick={() => console.log("Water clicked")}>
          <FaTint style={{ marginRight: 16 }} />
          <ListItemText primary="Water" />
        </ListItem>

        <ListItem sx={{ display: "flex", alignItems: "center" }} component="li" onClick={() => console.log("Sleep clicked")}>
          <FaMoon style={{ marginRight: 16 }} />
          <ListItemText primary="Sleep" />
        </ListItem>

        <ListItem sx={{ display: "flex", alignItems: "center" }} component="li" onClick={() => console.log("Customize clicked")}>
          <FaCar style={{ marginRight: 16 }} />
          <ListItemText primary="Customize" />
        </ListItem>

        <ListItem sx={{ display: "flex", alignItems: "center" }} component="li" onClick={() => console.log("Settings clicked")}>
          <FaCog style={{ marginRight: 16 }} />
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
