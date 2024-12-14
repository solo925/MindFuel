import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addGoal, deleteGoal, fetchGoals, updateGoal } from '../actions /goalsAction';
import { Goal } from '../types/index';

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
      builder.addCase(updateGoal.fulfilled, (state, action: PayloadAction<Goal>) => {
        const updatedGoal = action.payload;
        const goalIndex = state.goals!.findIndex((goal) => goal.id === updatedGoal.id);
        if (goalIndex !== -1) {
          state.goals![goalIndex] = updatedGoal; 
        }
      })
      .addCase(deleteGoal.fulfilled, (state, action: PayloadAction<string>) => {
        state.goals = state.goals!.filter((goal) => goal.id !== action.payload);
      });
  },
});

export default goalsSlice.reducer;
