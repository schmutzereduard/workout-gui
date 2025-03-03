import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import WorkoutApi from "../api/WorkoutApi";

export const fetchExercises = createAsyncThunk(
    "exercises/fetchExercises",
    async () => {
        const response = await WorkoutApi.getExercises();
        return response.data;
    }
);

export const addExercise = createAsyncThunk(
    "exercises/addExercise",
    async (exercise) => {
        const response = await WorkoutApi.addExercise(exercise);
        return response.data;
    }
);

export const updateExercise = createAsyncThunk(
    "exercises/updateExercise",
    async (exercise) => {
        const response = await WorkoutApi.updateExercise(exercise);
        return response.data;
    }
);

export const deleteExercise = createAsyncThunk(
    "exercises/deleteExercise",
    async (exerciseId) => {
        await WorkoutApi.deleteExercise(exerciseId);
        return exerciseId;
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

const exercisesSlice = createSlice({
    name: 'exercises',
    initialState: {
        exercises: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchExercises.pending, handlePending)
            .addCase(fetchExercises.rejected, handleRejected)
            .addCase(fetchExercises.fulfilled, (state, action) => {
                state.loading = false;
                state.exercises = action.payload;
            })
            .addCase(addExercise.pending, handlePending)
            .addCase(addExercise.rejected, handleRejected)
            .addCase(addExercise.fulfilled, (state, action) => {
                state.loading = false;
                state.exercises = [...state.exercises, action.payload];
            })
            .addCase(updateExercise.pending, handlePending)
            .addCase(updateExercise.rejected, handleRejected)
            .addCase(updateExercise.fulfilled, (state, action) => {
                state.loading = false;
                state.exercises = state.exercises.map(exercise => exercise.id === action.payload.id ? action.payload : exercise);
            })
            .addCase(deleteExercise.pending, handlePending)
            .addCase(deleteExercise.rejected, handleRejected)
            .addCase(deleteExercise.fulfilled, (state, action) => {
                state.loading = false;
                state.exercises = state.exercises.filter(exercise => exercise.id !== action.payload);
            });
    },
});

export default exercisesSlice.reducer;