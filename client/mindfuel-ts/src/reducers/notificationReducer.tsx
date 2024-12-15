import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addNotification, fetchNotifications } from "../actions /notificatioAction";

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
      .addCase(fetchNotifications.fulfilled, (state, action:PayloadAction<any>) => {
        state.notifications = action.payload;
        state.loading = false;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addNotification.fulfilled, (state, action:PayloadAction<any>) => {
        state.notifications.unshift(action.payload);
      })
      .addCase(addNotification.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { setNotifications, markAsRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;
