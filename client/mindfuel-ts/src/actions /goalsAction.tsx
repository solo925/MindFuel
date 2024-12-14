import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchGoals = createAsyncThunk(
  'goals/fetchGoals',
  async () => {
    const response = await axios.get('http://localhost:3000/api/v1/goals', {
      withCredentials: true,
    });
    return response.data;
  }
);

export const addGoal = createAsyncThunk(
  'goals/addGoal',
  async (goalData: { title?: string; type?: string; rating?: number }) => {
    const { title, type, rating } = goalData;
    const response = await axios.post(
      'http://localhost:3000/api/v1/goals',
      { title, type, rating },
      { withCredentials: true }
    );
    return response.data.data;
  }
);

export const updateGoal = createAsyncThunk(
  'goals/updateGoal',
  async (goalData: { id: string; achieved: boolean; rating: number }) => {
    const { id, achieved, rating } = goalData;
    const response = await axios.put(
      `http://localhost:3000/api/v1/goals/${id}`,
      { achieved, rating },
      { withCredentials: true }
    );
    return response.data;
  }
);

export const deleteGoal = createAsyncThunk(
  'goals/deleteGoal',
  async (goalId: string) => {
    await axios.delete(`http://localhost:3000/api/v1/goals/${goalId}`, {
      withCredentials: true,
    });
    return goalId;
  }
);
