import React from "react";
import { Card, CardContent, Typography, CardMedia, LinearProgress } from "@mui/material";

interface HabitCardProps {
  title: string;
  description: string;
  image: string;
  progress: string;
}

const HabitCard: React.FC<HabitCardProps> = ({
  title,
  description,
  image,
  progress,
}) => {
  // Convert progress to a number for LinearProgress (percentage)
  const progressPercentage = parseInt(progress);

  return (
    <Card sx={{ display: "flex", mb: 2, borderRadius: "10px", boxShadow: 3 }}>
      <CardMedia
        component="img"
        sx={{ width: 100, height: 80, objectFit: "cover", borderRadius: 1 }}
        image={image}
        alt={title}
      />
      <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          {description}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          Completed {progress}% today.
        </Typography>
        <LinearProgress variant="determinate" value={progressPercentage} sx={{ height: 5 }} />
      </CardContent>
    </Card>
  );
};

export default HabitCard;
