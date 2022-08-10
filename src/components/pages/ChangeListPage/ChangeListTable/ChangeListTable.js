import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import { DataGrid } from '@mui/x-data-grid';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import MessageSnackBar from "../../../utils/alerts/MessageSnackBar";
import { selectCsrfToken } from "../../../authentication/AuthProvider";
import {
    closeAlert,
    fetchChangelistData,
    performAction,
    selectChangeListData, setFilters, setPage,
    setPageSize,
    setSelectAcross,
    setSelectionModel,
    setSorting
} from "./changeListSlice";
import LoadingOverlay from "./LoadingOverlay";
import TablePagination from "./TableCustomPagination";
import TableEmptyOverlay from "./TableEmptyOverlay";
import TableLoadingSkeleton from "./TableLoadingSkeleton";
import TableToolbar from "./TableToolbar";

const Table = styled(DataGrid)(({ theme }) => ({
    boxShadow: theme.shadows[1],
    background: theme.palette.background.paper,
    border: '0',
    padding: theme.spacing(0),
    borderRadius: '12px',

    '.MuiSvgIcon-root': {
        color: theme.palette.grey[300],
        strokeWidth: '1px'
    },

    '.Mui-checked .MuiSvgIcon-root': {
        color: theme.palette.primary.main,
        strokeWidth: '1px'
    },

    '.MuiDataGrid-iconSeparator': {
        display: 'none'
    },

    '.MuiDataGrid-columnHeaders': {
        borderBottom: `0px`,

        '.MuiDataGrid-columnHeaderTitle': {
            color: theme.palette.text.secondary,
        }
    },

    '.MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
        borderBottom: `0px`,
    },

    '.MuiDataGrid-footerContainer': {
        borderTop: `0px`,
        padding: theme.spacing(5)
    },

    '.MuiTableCell-root': {
        border: '0px',
    },
    '.MuiDataGrid-selectedRowCount': {
        visibility: 'hidden',
    },

    '.feather': {
        strokeWidth: '1px'
    }
}));

const ChangeListTable = ({ model }) => {
    // forms state
    const [selectedAction, setSelectedAction] = useState('');

    // delay for the skeleton animation
    const [skeletonAnimationDelay, setSkeletonAnimationDelay] = useState(true);


    // csrfToken used for post requests
    const csrfToken = useSelector(selectCsrfToken);

    // changelist data
    const {
        status,
        rowsStatus,

        columns,
        rows,
        config,

        page,
        pageSize,

        selectionModel,
        selectAcross,

        filters,
        sorting,

        alertInfo,
    } = useSelector(selectChangeListData);

    const dispatch = useDispatch();

    // events
    const handlePageChange = (event, value) => dispatch(setPage(value))

    const handlePageSizeChange = event => dispatch(setPageSize(event.target.value));

    const handleSelectionModelChange = (newSelectionModel) => dispatch(setSelectionModel(newSelectionModel));

    const handleActionSelectChange = event => setSelectedAction(event.target.value);

    const handleToggleSelectAcross = event => {
        event.preventDefault();
        if (selectAcross) {
            dispatch(setSelectionModel([]));
        }
        dispatch(setSelectAcross(!selectAcross));
    };

    const handlePerformAction = () => (async () => {
        dispatch(performAction({
            url: model.perform_action_url,
            action: selectedAction,
            selectedIds: selectionModel,
            selectAcross: selectAcross,
            csrfToken: csrfToken,
        }));
    })();

    const handleFiltersChange = useCallback((event, name) => {
        dispatch(setFilters({ ...filters, [name]: event.target.value }))
    }, [filters]);

    const handleSearchFilterChange = useCallback(
        debounce((value, name) => {
            dispatch(setFilters({ ...filters, [name]: value }))
        }, 800)
        , [filters['filter_by_search']]);

    const handleSortingChange = useCallback(newSortModel => {
        let newSorting = newSortModel.map(item => ({
            ...item,
            'fieldIndex': columns.findIndex((column) => {
                return (column.field === item.field)
            })
        }));

        dispatch(setSorting(newSorting));
    }, [columns, sorting]);

    const handleCloseAlert = () => dispatch(closeAlert());

    useEffect(() => {
        // if the table is empty fetch the table data.
        if (status === 'idle') {
            dispatch(fetchChangelistData({
                url: model.changelist_url,
                page: page + 1,
                all: pageSize === config.list_max_show_all
            }));
        }

        // when the data is fetched:
        if (status === 'success') {
            // update rows if rows are not updated
            if (rowsStatus === 'notUpdated') {
                dispatch(fetchChangelistData({
                    url: model.changelist_url,
                    page: page + 1,
                    all: pageSize === config.list_max_show_all,
                    rowsOnly: true,
                    filters: filters,
                    sorting: sorting,
                }));
            }

            // when selectAcross is selected select all rows
            if (selectAcross) {
                let rowsIds = rows.map(row => row.id);
                dispatch(setSelectionModel(rowsIds));
            }
        }
    }, [rowsStatus, selectAcross]);

    setTimeout(() => {
        setSkeletonAnimationDelay(false);
    }, 1000);

    return (
        <Box sx={{ width: '100%', height: { xs: '600px', md: '80vh' } }}>
            <Box sx={{ height: '100%', }}>
                {
                    status === 'loading' || status === 'idle' || skeletonAnimationDelay
                        ? (
                            <TableLoadingSkeleton />
                        )
                        : (
                            <>
                                <Table
                                    autoHeight={rows.length > 0 ? true : false}
                                    loading={rowsStatus === 'notUpdated'}
                                    rows={rows}
                                    columns={columns}
                                    keepNonExistentRowsSelected={!selectAcross}
                                    checkboxSelectionVisibleOnly={selectAcross}
                                    disableSelectionOnClick
                                    checkboxSelection={true}
                                    isRowSelectable={() => !selectAcross}
                                    selectionModel={selectionModel}
                                    onSelectionModelChange={handleSelectionModelChange}
                                    disableColumnFilter={true}
                                    hideFooterSelectedRowCount={true}
                                    sortingMode="server"
                                    sortingModel={sorting}
                                    onSortModelChange={handleSortingChange}
                                    components={{
                                        Toolbar: TableToolbar,
                                        Pagination: TablePagination,
                                        NoRowsOverlay: TableEmptyOverlay,
                                        LoadingOverlay: LoadingOverlay,
                                    }}
                                    componentsProps={{
                                        pagination: {
                                            counter: config.result_count,
                                            pageSize: pageSize,
                                            rowsPerPageOptions: [config.list_per_page, config.list_max_show_all],
                                            page,
                                            filters,
                                            handlePageChange,
                                            handlePageSizeChange,
                                        },
                                        toolbar: {
                                            modelName: model.name,
                                            counter: config.result_count,
                                            filters_list: config.filters,
                                            selection_counter: config.actions_selection_counter,
                                            searchFields: config.search_fields,
                                            actions: config.action_choices,
                                            selectedAction,
                                            selectionModel,
                                            selectAcross,
                                            filters,
                                            handleToggleSelectAcross,
                                            handleActionSelectChange,
                                            handleFiltersChange,
                                            handleSearchFilterChange,
                                            handlePerformAction,
                                        }
                                    }}
                                />
                                <MessageSnackBar
                                    {...alertInfo}
                                    handleClose={handleCloseAlert}
                                />
                            </>
                        )
                }
            </Box>
        </Box>
    );
};


export default ChangeListTable;