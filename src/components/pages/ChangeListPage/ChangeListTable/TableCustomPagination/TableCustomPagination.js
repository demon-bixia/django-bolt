import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TablePagination from "@mui/material/TablePagination";
import { styled, useTheme } from "@mui/system";
import {
    gridPageSelector, useGridApiContext,
    useGridSelector
} from '@mui/x-data-grid';
import FeatherIcon from "feather-icons-react";


const PaginationWrap = styled(Box)(({ theme }) => ({
    '.MuiToolbar-root': {
        fontWeight: '300',
        color: theme.palette.text.primary
    },
    '.MuiSvgIcon-fontSizeMedium': {
        color: theme.palette.grey[300],
    },
}));

const ChangeListActionWrap = styled(Box)(({ theme }) => ({
    display: 'flex',
}));

const PaginationActions = (props) => {
    const theme = useTheme();

    return (
        <ChangeListActionWrap>
            <IconButton sx={{ marginLeft: theme.spacing(3) }} onClick={(event) => props.onPageChange(event, 0)}>
                <FeatherIcon icon="chevron-left" />
            </IconButton>

            <IconButton onClick={(event) => props.onPageChange(event, 1)}>
                <FeatherIcon icon="chevron-right" />
            </IconButton>
        </ChangeListActionWrap>
    );
};

const TableCustomPagination = (props) => {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);


    return (
        <PaginationWrap>
            <TablePagination
                component="div"
                page={page}
                count={props.counter}
                rowsPerPage={props.pageSize}
                rowsPerPageOptions={props.rowsPerPageOptions}
                onPageChange={(event, value) => apiRef.current.setPage(value)}
                onRowsPerPageChange={props.onPageSizeChange}
                ActionsComponent={PaginationActions}
            />
        </PaginationWrap>
    );
}


export default TableCustomPagination;