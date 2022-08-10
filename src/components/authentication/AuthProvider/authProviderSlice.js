import { createAsyncThunk, createSlice, isFulfilled, isAnyOf } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import client from "../../../application/client";

// Thunks
export const fetchCsrfToken = createAsyncThunk('auth/fetchCsrfToken', async () => {
    const response = await client.get('/csrf_token/');
    if (response['status'] === 200) return response['data']['csrftoken'];
});

export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
    const response = await client.get('/user_info/');
    if (response['status'] === 200) return response['data']['user'];
});


// Slice
export const authProviderSlice = createSlice({
    name: 'auth',

    initialState: {
        user: JSON.parse(Cookies.get('bolt-user') || null),
        csrfToken: Cookies.get('csrftoken') || null,
        status: "idle",
    },

    reducers: {
        setUser(state, action) {
            state.user = action.payload;
            Cookies.set('bolt-user', JSON.stringify(action.payload));
        },

        removeUser(state) {
            state.user = null;
            Cookies.set('bolt-user', JSON.stringify(null));
        },
    },

    extraReducers(builder) {
        builder
            .addCase(fetchCsrfToken.fulfilled, (state, action) => {
                state.csrfToken = action.payload;
                Cookies.set('csrftoken', action.payload);
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload;
                Cookies.set('bolt-user', JSON.stringify(action.payload));
                state.status = 'success';
            })
            .addCase(fetchUser.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchUser.rejected, state => {
                state.status = 'failure';
            })
    }
});

// Selectors
export const selectUser = state => state.auth.user;

export const selectCsrfToken = state => state.auth.csrfToken;

export const selectStatus = state => state.auth.status;

export const { setUser, removeUser } = authProviderSlice.actions;

export default authProviderSlice.reducer;
