import { DataGrid } from '@mui/x-data-grid';
import { styled } from "@mui/system";

const Table = styled(DataGrid)(({ theme }) => ({
    boxShadow: theme.shadows[0],
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

export default Table;