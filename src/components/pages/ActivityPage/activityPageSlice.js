import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../../../application/client";
import { constructUrls, constructRows } from "./utils";

// Thunks
export const fetchActivityLog = createAsyncThunk('activity/fetchActivityLog', async (data, { rejectWithValue }) => {
    try {
        const response = await client.get(constructUrls(data));
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

// Slice
const initialState = {
    // status
    status: 'idle',
    rowsStatus: 'notUpdated',

    // data
    actionList: [],
    config: {},
    rows: [],

    // pagination
    page: 0,
    pageSize: 8,
};

const ActivityPageSlice = createSlice({
    name: 'activity',

    initialState: initialState,

    reducers: {
        setStatus(state, action) {
            state.status = action.payload;
        },

        setRowsStatus(state, action) {
            state.rowStatus = action.payload;
        },

        setPage(state, action) {
            if (state.rowsStatus === 'updated') {
                state.page = action.payload;
                state.rowsStatus = 'notUpdated';
            }
        },

        setPageSize(state, action) {
            if (state.rowsStatus === 'updated') {
                state.pageSize = parseInt(action.payload, 10);
                state.rowsStatus = 'notUpdated';
            }
        },

        resetActivityState(state) {
            for (let [key, value] of Object.entries(initialState)) {
                state[key] = value;
            }
        },
    },

    extraReducers(builder) {
        builder
            .addCase(fetchActivityLog.pending, (state, action) => {
                if (!action.meta.arg.rowsOnly) {
                    state.status = 'loading';
                }
            })

            .addCase(fetchActivityLog.fulfilled, (state, action) => {
                state.config = action.payload.config;
                state.rows = constructRows(action.payload.action_list);
                state.actionList = action.payload.action_list;

                if (action.meta.arg.rowsOnly) {
                    state.rowsStatus = 'updated';
                } else {
                    state.status = 'success';
                    state.rowsStatus = 'updated';
                }
            })

            .addCase(fetchActivityLog.rejected, (state, action) => {
                if (!action.meta.arg.rowsOnly) {
                    state.status = 'failure';
                }
            })
    }
});

// Selectors
export const selectActivityData = state => ({
    status: state.activity.status,
    rowsStatus: state.activity.rowsStatus,
    rows: state.activity.rows,
    actionList: state.activity.actionList,
    config: state.activity.config,
    page: state.activity.page,
    pageSize: state.activity.pageSize,
});

// Actions
export const { setStatus, setPageSize, setPage, resetActivityState, setRowsStatus } = ActivityPageSlice.actions;

// Reducer
export default ActivityPageSlice.reducer;