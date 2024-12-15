import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


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
