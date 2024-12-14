import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Notification {
  id?: number;
  userId?: number;
  message?: string;
  read?: boolean;
  createdAt?: Date;
}

interface NotificationsState {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
}

const initialState: NotificationsState = {
  notifications: [],
  loading: false,
  error: null,
};


export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Notification[]>(
        "http://localhost:3000/api/v1/notifications",
        {
          withCredentials: true, 
        }
      );

      return response.data; 
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  }
);

// Add a new notification
export const addNotification = createAsyncThunk(
  "notifications/addNotification",
  async (
    notificationData: { message: string },
    { rejectWithValue }
  ) => {
    try {
      const {message } = notificationData;
      const response = await axios.post<Notification>(
        "http://localhost:3000/api/v1/notifications",
        { message },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Ensure cookies are sent
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  }
);


// Slice
const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.notifications = action.payload;
    },
    markAsRead: (state, action: PayloadAction<number>) => {
      const notification = state.notifications.find((n) => n.id === action.payload);
      if (notification) notification.read = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.loading = false;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addNotification.fulfilled, (state, action) => {
        state.notifications.unshift(action.payload);
      })
      .addCase(addNotification.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { setNotifications, markAsRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;
