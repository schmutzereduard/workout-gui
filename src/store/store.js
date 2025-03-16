import { configureStore } from '@reduxjs/toolkit';
import sessionSlice from "./sessionSlice";
import workoutSlice from "./workoutSlice";
import exerciseSlice from "./exerciseSlice";

const store = configureStore({
    reducer: {
        sessions: sessionSlice,
        workouts: workoutSlice,
        exercises: exerciseSlice,
    },
});

export default store;