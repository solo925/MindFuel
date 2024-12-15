import { createSlice } from "@reduxjs/toolkit";
import { createHabit, fetchHabits } from "../actions /habitAction";

interface Habit {
  id: string;
  name: string;
  description: string;
  frequency: number;
  unit: string;
  nextReminder: Date;
}

interface Notification {
  id: string;
  message: string;
}

interface HabitState {
  habits: Habit[];
  notifications: Notification[];
  loading: boolean;
  error: null | string;
}

const initialState: HabitState = {
  habits: [],
  notifications: [],
  loading: false,
  error: null,
};



const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabits.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.loading = false;
        state.habits = action.payload;
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch habits";
      })
      .addCase(createHabit.fulfilled, (state, action) => {
        state.habits.push(action.payload);
        state.notifications.push({
          id: action.payload.id,
          message: `Habit "${action.payload.name}" created successfully!`,
        });
      });
  },
});

export const { addNotification } = habitSlice.actions;
export default habitSlice.reducer;
