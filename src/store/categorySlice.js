import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import WorkoutApi from "../api/WorkoutApi";

export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async () => {
        const response = await WorkoutApi.getCategories();
        return response.data;
    }
);

export const addCategory = createAsyncThunk(
    "categories/addCategory",
    async (category) => {
        const response = await WorkoutApi.addCategory(category);
        return response.data;
    }
);

export const updateCategory = createAsyncThunk(
    "categories/updateCategory",
    async (category) => {
        const response = await WorkoutApi.updateCategory(category);
        return response.data;
    }
);

export const deleteCategory = createAsyncThunk(
    "categories/deleteCategory",
    async (categoryId) => {
        await WorkoutApi.deleteCategory(categoryId);
        return categoryId;
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

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, handlePending)
            .addCase(fetchCategories.rejected, handleRejected)
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(addCategory.pending, handlePending)
            .addCase(addCategory.rejected, handleRejected)
            .addCase(addCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = [...state.categories, action.payload];
            })
            .addCase(updateCategory.pending, handlePending)
            .addCase(updateCategory.rejected, handleRejected)
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = state.categories.map(category => category.id === action.payload.id ? action.payload : category);
            })
            .addCase(deleteCategory.pending, handlePending)
            .addCase(deleteCategory.rejected, handleRejected)
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = state.categories.filter(category => category.id !== action.payload);
            });
    },
});

export default categoriesSlice.reducer;