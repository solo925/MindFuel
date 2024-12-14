import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchHabits = createAsyncThunk(
  "habits/fetchHabits", async () => {
  const response = await axios.get("http://localhost:3000/api/v1/habits", {
    withCredentials: true,
  });
  return response.data;
});
  
  
  export const createHabit = createAsyncThunk(
    "habits/createHabit",
    async (habit: { name: string; description: string; frequency: number; unit: string;}) => {
      const response = await axios.post("http://localhost:3000/api/v1/habits", habit,
        {
        withCredentials: true,
      });
      return response.data;
    }
  );