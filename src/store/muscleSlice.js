import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import WorkoutApi from "../api/WorkoutApi";

export const fetchMuscles = createAsyncThunk(
    "muscles/fetchMuscles",
    async () => {
        const response = await WorkoutApi.getMuscles();
        return response.data;
    }
);

export const addMuscle = createAsyncThunk(
    "muscles/addMuscle",
    async (muscle) => {
        const response = await WorkoutApi.addMuscle(muscle);
        return response.data;
    }
);

export const updateMuscle = createAsyncThunk(
    "muscles/updateMuscle",
    async (muscle) => {
        const response = await WorkoutApi.updateMuscle(muscle);
        return response.data;
    }
);

export const deleteMuscle = createAsyncThunk(
    "muscles/deleteMuscle",
    async (muscleId) => {
        await WorkoutApi.deleteMuscle(muscleId);
        return muscleId;
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

const musclesSlice = createSlice({
    name: 'muscles',
    initialState: {
        muscles: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMuscles.pending, handlePending)
            .addCase(fetchMuscles.rejected, handleRejected)
            .addCase(fetchMuscles.fulfilled, (state, action) => {
                state.loading = false;
                state.muscles = action.payload;
            })
            .addCase(addMuscle.pending, handlePending)
            .addCase(addMuscle.rejected, handleRejected)
            .addCase(addMuscle.fulfilled, (state, action) => {
                state.loading = false;
                state.muscles = [...state.muscles, action.payload];
            })
            .addCase(updateMuscle.pending, handlePending)
            .addCase(updateMuscle.rejected, handleRejected)
            .addCase(updateMuscle.fulfilled, (state, action) => {
                state.loading = false;
                state.muscles = state.muscles.map(muscle => muscle.id === action.payload.id ? action.payload : muscle);
            })
            .addCase(deleteMuscle.pending, handlePending)
            .addCase(deleteMuscle.rejected, handleRejected)
            .addCase(deleteMuscle.fulfilled, (state, action) => {
                state.loading = false;
                state.muscles = state.muscles.filter(muscle => muscle.id !== action.payload);
            });
    },
});

export default musclesSlice.reducer;