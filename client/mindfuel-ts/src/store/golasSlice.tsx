import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Goal {
  id: string;
  title: string;
  type: 'daily' | 'weekly' | 'monthly' | 'yearly';
  achieved: boolean;
}

interface GoalsState {
  goals?: Goal[] | undefined;
  loading?: boolean|undefined;
  error?: string | null | undefined;
}

const initialState: GoalsState = {
  goals: [],
  loading: false,
  error: null,
};


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
  async (goalData: { title: string; type: string }) => {
    const { title, type } = goalData;
    const response = await axios.post(
      'http://localhost:3000/api/v1/goals',
      { title, type },
      { withCredentials: true } 
    );
    return response.data.data;
  }
);

// Update goal (withCredentials will send cookies automatically)
export const updateGoal = createAsyncThunk(
  'goals/updateGoal',
  async (goalData: { id: string; achieved: boolean }) => {
    const { id, achieved } = goalData;
    const response = await axios.put(
      `http://localhost:3000/api/v1/goals/${id}`,
      { achieved },
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

const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGoals.fulfilled, (state, action: PayloadAction<Goal[]>) => {
        state.loading = false;
        state.goals = action.payload;
      })
      .addCase(fetchGoals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch goals';
      })
      .addCase(addGoal.fulfilled, (state, action: PayloadAction<Goal>) => {
        state.goals!.push(action.payload);
      })
      .addCase(updateGoal.fulfilled, (state, action: PayloadAction<Goal>) => {
        const index = state.goals!.findIndex((goal) => goal.id === action.payload.id);
        if (index !== -1) {
          state.goals![index] = action.payload;
        }
      })
      .addCase(deleteGoal.fulfilled, (state, action: PayloadAction<string>) => {
        state.goals = state.goals!.filter((goal) => goal.id !== action.payload);
      });
  },
});

export default goalsSlice.reducer;
