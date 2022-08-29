import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DataGrid from "../../../utils/Table";
import TableCustomPagination from "../../../utils/TableCustomPagination";
import { fetchActivityLog, selectActivityData, setPage, setPageSize, resetActivityState } from "../activityPageSlice";
import TableToolbar from "./TableToolbar";
import LoadingOverlay from "../../../utils/overlays/LoadingOverlay";
import TableEmptyOverlay from "../../../utils/overlays/TableEmptyOverlay";
import TableSkeleton from "./TableSkeleton";

const closeAnimation = (setSkeletonAnimationDelay) => {
    setTimeout(() => {
        setSkeletonAnimationDelay(false);
    }, 1000);
}

const columns = [
    { field: "object_repr", headerName: "Representation", flex: 1, minWidth: 100, sortable: false },
    { field: "user", headerName: "User", flex: 1, minWidth: 100, sortable: false },
    { field: "object_id", headerName: "Object Id", flex: 1, minWidth: 100, sortable: false },
    { field: "action", headerName: "Action", flex: 1, minWidth: 100, sortable: false },
    { field: "time", headerName: "Time", flex: 1, minWidth: 100, sortable: false },
];

const Table = styled(DataGrid)(({ theme }) => ({
    '& .MuiDataGrid-footerContainer': {
        padding: theme.spacing(6, 0, 0, 0)
    }
}));

const ActivityTable = () => {
    const [skeletonAnimationDelay, setSkeletonAnimationDelay] = useState(true);

    const {
        status,
        rowsStatus,
        rows,
        config,
        page,
        pageSize
    } = useSelector(selectActivityData);

    const { objectId = null } = useParams();

    const dispatch = useDispatch();

    const handlePageChange = (event, value) => {
        dispatch(setPage(value));
    };

    const handlePageSizeChange = (event) => {
        dispatch(setPageSize(event.target.value));
    };

    // when the url is changed remove reset page;
    useEffect(() => {
        dispatch(resetActivityState());
        setSkeletonAnimationDelay(true);
        closeAnimation(setSkeletonAnimationDelay);
    }, [objectId])

    useEffect(() => {
        // if the table is empty fetch the table data.
        if (status === 'idle') {
            dispatch(fetchActivityLog({ objectId, page, pageSize, rowsOnly: false }));
        }

        // when the data is fetched:
        if (status === 'success') {
            // update rows if rows are not updated
            if (rowsStatus === 'notUpdated') {
                dispatch(fetchActivityLog({ objectId, page, pageSize, rowsOnly: true }));
            }
        }
    }, [page, pageSize, status]);

    closeAnimation(setSkeletonAnimationDelay);

    return (
        <Box sx={{ width: '100%', height: { xs: '600px', md: '80vh' } }}>
            {
                ['loading', 'idle'].includes(status) || skeletonAnimationDelay
                    ? (<TableSkeleton />)
                    : (
                        <Table
                            sx={{ padding: theme => theme.spacing(5) }}
                            loading={rowsStatus === 'notUpdated'}
                            autoHeight={false}
                            columns={columns}
                            rows={rows}
                            disableColumnFilter={true}
                            disableSelectionOnClick
                            components={{
                                Toolbar: TableToolbar,
                                Pagination: TableCustomPagination,
                                NoRowsOverlay: TableEmptyOverlay,
                                LoadingOverlay: LoadingOverlay,
                            }}
                            componentsProps={{
                                pagination: {
                                    counter: config.full_result_count,
                                    pageSize: pageSize,
                                    rowsPerPageOptions: [8, config.full_result_count || 200],
                                    filters: [],
                                    page,
                                    handlePageChange,
                                    handlePageSizeChange,
                                }
                            }}
                        />
                    )
            }
        </Box>
    );
};

export default ActivityTable;