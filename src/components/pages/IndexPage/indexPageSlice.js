import { createAsyncThunk, createEntityAdapter, createSlice, isAnyOf, isFulfilled } from "@reduxjs/toolkit";
import client from "../../../application/client";

// Adapters
const actionListAdapter = createEntityAdapter({});

// Thunks
export const fetchAppList = createAsyncThunk('index/fetchAppList', async () => {
    const response = await client.get('/index/');
    if (response['status'] === 200) return response.data['app_list'];
});

export const fetchActionList = createAsyncThunk('index/fetchActionList', async () => {
    const response = await client.get('/admin_log/?o=-action_time');
    if (response['status'] === 200) return response.data['action_list'];
});

// Slice
const initialState = {
    appList: [],
    actionList: actionListAdapter.getInitialState(),
    status: 'idle',
};

export const indexPageSlice = createSlice({
    name: 'index',

    initialState: initialState,

    reducers: {
        resetIndexPage(state) {
            for (let [key, value] of Object.entries(initialState)) {
                state[key] = value;
            }
        }
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
export const selectModelByName = (state, appLabel, modelName) => {
    try {
        let app = state.index.appList.find(app => app.app_label === appLabel);
        return app.models.find(model => model.name === modelName);
    } catch (error) {
        return {};
    }
};

// Actions
export const { resetIndexPage } = indexPageSlice.actions;

// Reducer
export default indexPageSlice.reducer;