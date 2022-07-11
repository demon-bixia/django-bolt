import { createAsyncThunk, createEntityAdapter, createSlice, isAnyOf, isFulfilled } from "@reduxjs/toolkit";
import client from "../../../application/client";

// Adapters
const actionListAdapter = createEntityAdapter({
    sortComparer: (a, b) => a['action_time'].localeCompare(b['action_time']),

});


// Thunks
export const fetchAppList = createAsyncThunk('index/fetchAppList', async () => {
    const response = await client.get('/index/');
    if (response['status'] === 200) return response.data['app_list'];
});

export const fetchActionList = createAsyncThunk('index/fetchActionList', async () => {
    const response = await client.get('/admin_log/');
    if (response['status'] === 200) return response.data['action_list'];
});


// Slice
export const indexPageSlice = createSlice({
    name: 'index',

    initialState: {
        appList: [],
        actionList: actionListAdapter.getInitialState(),
        status: 'idle',
    },

    extraReducers(builder) {
        builder
            .addCase(fetchAppList.fulfilled, (state, action) => {
                state.appList = action.payload;
            })
            .addCase(fetchActionList.fulfilled, (state, action) => {
                actionListAdapter.upsertMany(state.actionList, action.payload);
            })
            .addMatcher(isAnyOf(fetchAppList.pending, fetchActionList.pending), state => {
                state.status = 'loading';
            })
            .addMatcher(isFulfilled(fetchAppList, fetchActionList), state => {
                state.status = 'success';
            })
            .addMatcher(isAnyOf(fetchAppList.rejected, fetchActionList.rejected), state => {
                state.status = 'failure';
            });
    }
});

// selectors
export const selectAllApps = state => state.index.appList;
export const { selectAll: selectAllActions } = actionListAdapter.getSelectors(state => state.index.actionList);
export const selectStatus = state => state.index.status;

export default indexPageSlice.reducer;