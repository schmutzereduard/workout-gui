import { configureStore } from '@reduxjs/toolkit';
import categorySlice from "./categorySlice";
import muscleSlice from "./muscleSlice";
import exerciseSlice from "./exerciseSlice";

const store = configureStore({
    reducer: {
        categories: categorySlice,
        muscles: muscleSlice,
        exercises: exerciseSlice,
    },
});

export default store;