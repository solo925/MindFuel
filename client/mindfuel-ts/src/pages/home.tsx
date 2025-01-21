import React from "react";
import HabitCard from "../components/home/HabitCard";
import Header from "../components/home/Header";
import Sidebar from "../components/home/SideBar";
import { Box, Grid, Typography, Paper } from "@mui/material";

const HomePage: React.FC = () => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          p: 3,
          marginLeft: "60px", // Ensure the content starts after the sidebar width
          paddingTop: "80px", // Adjust for the height of the header
        }}
      >
        {/* Header */}
        <Header />

        {/* Your Habits Section */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
            Your Habits
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
            Track and improve your daily habits.
          </Typography>

          {/* Habit Cards */}
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <HabitCard
                  title="Stretch"
                  description="Improve flexibility with daily stretches."
                  image="/stretch.jpg"
                  progress="80%"
                />
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <HabitCard
                  title="No Coffee"
                  description="Stay caffeine-free for better sleep."
                  image="/coffe.jpg"
                  progress="100%"
                />
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <HabitCard
                  title="No Snacking"
                  description="Avoid snacks to maintain focus."
                  image="/snacks.jpg"
                  progress="60%"
                />
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <HabitCard
                  title="Workout"
                  description="Engage in 30 minutes of exercise."
                  image="/workout.jpg"
                  progress="90%"
                />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
