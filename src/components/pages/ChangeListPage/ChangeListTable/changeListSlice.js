import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../../../../application/client";
import { constructColumns, constructRows, constructUrl } from "./utils";

// Thunks
export const fetchChangelistData = createAsyncThunk('changelist/fetchChangelistData', async (data, { rejectWithValue }) => {
    try {
        const response = await client.get(constructUrl(data));
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});


export const performAction = createAsyncThunk('changelist/performAction', async ({ url, action, selectedIds = [], selectAcross, csrfToken }, { rejectWithValue }) => {
    try {
        const response = await client.post(url, { "selected_ids": selectedIds, action: action, 'select_across': selectAcross }, { headers: { 'X-CSRFToken': csrfToken } });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Slice
const initialState = {
    // status
    status: 'idle',
    rowsStatus: 'idle',

    // data
    columns: [],
    rows: [],
    config: {},
    changeUrls: {},

    // pagination
    page: 0,
    pageSize: 0,

    // selection        
    selectionModel: [],
    selectAcross: false,

    // filters
    filters: {},

    // sorting
    sorting: [],

    // alerts
    alertInfo: {
        open: false,
        severity: 'success',
        message: '',
    }
};

export const changeListSlice = createSlice({
    name: 'changelist',

    initialState: initialState,

    reducers: {
        // status
        setStatus(state, action) {
            state.status = action.payload;
        },

        setRowsStatus(state, action) {
            state.rowsStatus = action.payload;
        },

        resetChangeList(state) {
            for (let [key, value] of Object.entries(initialState)) {
                state[key] = value;
            }
        },

        // page
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

        // selection
        setSelectionModel(state, action) {
            state.selectionModel = action.payload;
        },

        setSelectAcross(state, action) {
            state.selectAcross = action.payload;
        },

        // filters
        setFilters(state, action) {
            if (state.rowsStatus === 'updated') {
                state.filters = action.payload;
                state.rowsStatus = 'notUpdated';
            }
        },

        //sorting
        setSorting(state, action) {
            if (state.rowsStatus === 'updated') {
                state.sorting = action.payload;
                state.rowsStatus = 'notUpdated';
            }
        },

        // alerts
        closeAlert(state) {
            state.alertInfo = { ...state.alertInfo, open: false };
        },
    },

    extraReducers(builder) {
        builder
            // action performed changes
            .addCase(performAction.fulfilled, (state, action) => {
                state.rowsStatus = 'notUpdated';
                state.alertInfo = {
                    open: true,
                    message: action.payload.detail || 'action was performed successfully',
                    severity: 'success',
                };
                state.selectionModel = [];
                state.selectAcross = false;
            }).addCase(performAction.rejected, (state, action) => {
                state.alertInfo = {
                    open: true,
                    message: action.payload.detail || 'an error occurred while performing an action',
                    severity: 'error',
                };
                state.selectionModel = [];
                state.selectAcross = 'notUpdated';
            })

            // page status changes
            .addCase(fetchChangelistData.pending, (state, action) => {
                if (!action.meta.arg.rowsOnly) {
                    state.status = 'loading';
                }
            }).addCase(fetchChangelistData.rejected, (state, action) => {
                if (!action.meta.arg.rowsOnly) {
                    state.status = 'failure';
                }
            }).addCase(fetchChangelistData.fulfilled, (state, action) => {
                if (action.meta.arg.rowsOnly) {
                    state.config = action.payload.config;
                    [state.rows, state.changeUrls] = constructRows(action.payload);
                } else {
                    state.config = action.payload.config;
                    state.columns = constructColumns(action.payload);
                    [state.rows, state.changeUrls] = constructRows(action.payload);

                    state.pageSize = action.payload.config.list_per_page;
                }

                state.rowsStatus = 'updated';
                state.status = 'success';
            });
    }
});

// Selectors
// status
export const selectChangeListData = state => ({
    status: state.changelist.status,
    rowsStatus: state.changelist.rowsStatus,

    columns: state.changelist.columns,
    rows: state.changelist.rows,
    config: state.changelist.config,
    changeUrls: state.changelist.changeUrls,

    page: state.changelist.page,
    pageSize: state.changelist.pageSize,

    selectionModel: state.changelist.selectionModel,
    selectAcross: state.changelist.selectAcross,

    filters: state.changelist.filters,
    sorting: state.changelist.sorting,

    alertInfo: state.changelist.alertInfo,
});

// Actions
export const { setStatus, setPageSize, resetChangeList, setPage, setSelectionModel, setSelectAcross, setFilters, setSorting, closeAlert, setRowsStatus, } = changeListSlice.actions;

// Reducer
export default changeListSlice.reducer;
