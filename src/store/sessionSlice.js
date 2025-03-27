import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import WorkoutApi from "../api/WorkoutApi";

export const fetchSessions = createAsyncThunk(
    "sessions/fetchSessions",
    async () => {
        const response = await WorkoutApi.getSessions();
        return response.data;
    }
);

export const addSession = createAsyncThunk(
    "sessions/addSession",
    async (session) => {
        const response = await WorkoutApi.addSession(session);
        return response.data;
    }
);

export const updateSession = createAsyncThunk(
    "sessions/updateSession",
    async (session) => {
        const response = await WorkoutApi.updateSession(session);
        return response.data;
    }
);

export const deleteSessions = createAsyncThunk(
    "sessions/deleteSessions",
    async (ids) => {
        await WorkoutApi.deleteSessions(ids);
        return ids;
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

const sessionsSlice = createSlice({
    name: 'sessions',
    initialState: {
        sessions: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSessions.pending, handlePending)
            .addCase(fetchSessions.rejected, handleRejected)
            .addCase(fetchSessions.fulfilled, (state, action) => {
                state.loading = false;
                state.sessions = action.payload;
            })
            .addCase(addSession.pending, handlePending)
            .addCase(addSession.rejected, handleRejected)
            .addCase(addSession.fulfilled, (state, action) => {
                state.loading = false;
                state.sessions = [...state.sessions, action.payload];
            })
            .addCase(updateSession.pending, handlePending)
            .addCase(updateSession.rejected, handleRejected)
            .addCase(updateSession.fulfilled, (state, action) => {
                state.loading = false;
                state.sessions = state.sessions.map(session => session.id === action.payload.id ? action.payload : session);
            })
            .addCase(deleteSessions.pending, handlePending)
            .addCase(deleteSessions.rejected, handleRejected)
            .addCase(deleteSessions.fulfilled, (state, action) => {
                state.loading = false;
                state.sessions = state.sessions.filter(session => !action.payload.includes(session.id));
            });
    },
});

export default sessionsSlice.reducer;