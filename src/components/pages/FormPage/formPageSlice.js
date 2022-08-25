import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../../../application/client";

// Thunks
export const fetchFormData = createAsyncThunk('form/fetchFormData', async ({ url }) => {
    const response = await client.get(url);
    return response.data;
});

// Slice
const initialState = {
    status: 'idle',
    formStatus: 'idle',
    config: {},
    fields: [],
    inlines: [],
    alertInfo: {
        open: false,
        severity: 'success',
        message: '',
    }
};

export const formPageSlice = createSlice({
    name: 'form',
    initialState: initialState,

    reducers: {
        setAlertInfo(state, action) {
            state.alertInfo = action.payload;
        },
        resetForm(state) {
            for (let [key, value] of Object.entries(initialState)) {
                if (key !== 'alertInfo')
                    state[key] = value;
            }
        },
    },

    extraReducers(builder) {
        builder
            // fetch status changes
            .addCase(fetchFormData.pending, (state) => {
                state.status = 'loading';
            }).addCase(fetchFormData.rejected, (state) => {
                state.status = 'failure';
            }).addCase(fetchFormData.fulfilled, (state, action) => {
                state.config = action.payload.config;
                state.fields = action.payload.fields;
                state.inlines = action.payload.inlines;
                state.status = 'success';
            })
    }
});

// Selectors
export const selectStatus = state => state.form.status;
export const selectFields = state => state.form.fields;
export const selectConfig = state => state.form.config;
export const selectInlines = state => state.form.inlines;
export const selectAlertInfo = state => state.form.alertInfo;

// Actions
export const { setAlertInfo, resetForm } = formPageSlice.actions;

// Reducer
export default formPageSlice.reducer;