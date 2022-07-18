import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TablePagination from "@mui/material/TablePagination";
import { styled, useTheme } from "@mui/system";
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
            <IconButton
                sx={{ marginLeft: theme.spacing(3) }}
                onClick={(event) => props.onPageChange(event, 0)}
                disabled={props.count <= props.rowsPerPage || props.page === 0}
            >
                <FeatherIcon icon="chevron-left" />
            </IconButton>

            <IconButton
                onClick={(event) => props.onPageChange(event, 1)}
                disabled={props.count <= props.rowsPerPage || (props.page + 1) * props.rowsPerPage >= props.count}
            >
                <FeatherIcon icon="chevron-right" />
            </IconButton>
        </ChangeListActionWrap>
    );
};

const withFilters = (WrappedComponent, filters) => {

    return (props) => (
        <WrappedComponent filters={filters} {...props} />
    );
}


const TableCustomPagination = ({ page, counter, pageSize, rowsPerPageOptions, handlePageChange, handlePageSizeChange, filters }) => {

    return (
        <PaginationWrap>
            <TablePagination
                component="div"
                page={page}
                count={counter}
                rowsPerPage={pageSize}
                rowsPerPageOptions={rowsPerPageOptions}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handlePageSizeChange}
                ActionsComponent={withFilters(PaginationActions, filters)}
            />
        </PaginationWrap>
    );
}


export default TableCustomPagination;