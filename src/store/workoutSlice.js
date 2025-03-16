import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import WorkoutApi from "../api/WorkoutApi";

export const fetchWorkouts = createAsyncThunk(
    "workouts/fetchWorkouts",
    async () => {
        const response = await WorkoutApi.getWorkouts();
        return response.data;
    }
);

export const addWorkout = createAsyncThunk(
    "workouts/addWorkout",
    async (workout) => {
        const response = await WorkoutApi.addWorkout(workout);
        return response.data;
    }
);

export const updateWorkout = createAsyncThunk(
    "workouts/updateWorkout",
    async (workout) => {
        const response = await WorkoutApi.updateWorkout(workout);
        return response.data;
    }
);

export const deleteWorkout = createAsyncThunk(
    "workouts/deleteWorkout",
    async (workoutId) => {
        await WorkoutApi.deleteWorkout(workoutId);
        return workoutId;
    }
);

const handlePending = (state) => {
    state.loading = true;
    state.error = null;
};

const handleRejected = (state, action) => {
    state.loading = false;
    state.error = action.error.message;
};

const workoutsSlice = createSlice({
    name: 'workouts',
    initialState: {
        workouts: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWorkouts.pending, handlePending)
            .addCase(fetchWorkouts.rejected, handleRejected)
            .addCase(fetchWorkouts.fulfilled, (state, action) => {
                state.loading = false;
                state.workouts = action.payload;
            })
            .addCase(addWorkout.pending, handlePending)
            .addCase(addWorkout.rejected, handleRejected)
            .addCase(addWorkout.fulfilled, (state, action) => {
                state.loading = false;
                state.workouts = [...state.workouts, action.payload];
            })
            .addCase(updateWorkout.pending, handlePending)
            .addCase(updateWorkout.rejected, handleRejected)
            .addCase(updateWorkout.fulfilled, (state, action) => {
                state.loading = false;
                state.workouts = state.workouts.map(workout => workout.id === action.payload.id ? action.payload : workout);
            })
            .addCase(deleteWorkout.pending, handlePending)
            .addCase(deleteWorkout.rejected, handleRejected)
            .addCase(deleteWorkout.fulfilled, (state, action) => {
                state.loading = false;
                state.workouts = state.workouts.filter(workout => workout.id !== action.payload);
            });
    },
});

export default workoutsSlice.reducer;