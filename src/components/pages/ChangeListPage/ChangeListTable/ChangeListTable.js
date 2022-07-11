import Box from "@mui/material/Box";
import LinearProgress from '@mui/material/LinearProgress';
import { styled, useTheme } from "@mui/system";
import {
    DataGrid
} from '@mui/x-data-grid';
import FeatherIcon from "feather-icons-react";
import { useEffect, useState } from 'react';
import TablePagination from "./TableCustomPagination";
import TableEmptyOverlay from "./TableEmptyOverlay";
import TableLoadingSkeleton from "./TableLoadingSkeleton";
import TableToolbar from "./TableToolbar";


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
        display: 'none',
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

const BooleanDisplayWrapper = styled(Box)(({ theme, value }) => ({
    backgroundColor: value ? theme.palette.success.tint : theme.palette.error.tint,
    borderRadius: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: '1px',
    width: '16px',
    height: '16px',
    alignItems: 'center',
    '.feather': {
        color: theme.palette.grey[100],
        stokeWidth: '1.5px',
    }
}))

const BooleanDisplayIcon = ({ value }) => {
    const theme = useTheme();

    return (
        <BooleanDisplayWrapper value={value}>
            <FeatherIcon icon={value ? 'check' : 'x'} size={16} />
        </BooleanDisplayWrapper >
    )
};

const booleanRenderer = (params) => <BooleanDisplayIcon value={params.value} />;

let columns = [
    { 'field': 'username', 'type': 'string', 'headerName': 'username', 'width': 200, },
    { 'field': 'email_address', 'type': 'string', 'headerName': 'email address', 'width': 200 },
    { 'field': 'first_name', 'type': 'string', 'headerName': 'first name', 'width': 200 },
    { 'field': 'last_name', 'type': 'string', 'headerName': 'last name', 'width': 200 },
    { 'field': 'staff_status', 'type': 'boolean', 'headerName': 'staff status', 'width': 200, renderCell: booleanRenderer }
]

const rows = [
    {
        'id': '1',
        'username': 'Zhuo-Fan',
        'email_address': 'admin@email.com',
        'first_name': 'Fan',
        'last_name': 'Zhuo',
        'staff_status': true,
    },
    {
        'id': '2',
        'username': 'Zhuo-Yi-Fan',
        'email_address': 'worker@email.com',
        'first_name': 'Yi-Fan',
        'last_name': 'Zhuo',
        'staff_status': false,
    },
    {
        'id': '3',
        'username': 'Li-Wu-Yi',
        'email_address': 'worker@email.com',
        'first_name': 'Wu-Yi',
        'last_name': 'Li',
        'staff_status': false,
    },
    {
        'id': '4',
        'username': 'Yang-Kai',
        'email_address': 'admin@email.com',
        'first_name': 'Kai\'er',
        'last_name': 'Yang',
        'staff_status': true,
    },
    {
        'id': '5',
        'username': 'Zhuo-Yi-Fan',
        'email_address': 'worker@email.com',
        'first_name': 'Yi-Fan',
        'last_name': 'Zhuo',
        'staff_status': false,
    },
    {
        'id': '6',
        'username': 'Su-Yan',
        'email_address': 'admin@email.com',
        'first_name': 'Yan',
        'last_name': 'Su',
        'staff_status': true,
    },
    {
        'id': '7',
        'username': 'Su-Yan',
        'email_address': 'admin@email.com',
        'first_name': 'Yan',
        'last_name': 'Su',
        'staff_status': true,
    },
    {
        'id': '8',
        'username': 'Su-Yan',
        'email_address': 'admin@email.com',
        'first_name': 'Yan',
        'last_name': 'Su',
        'staff_status': true,
    },
    {
        'id': '9',
        'username': 'Su-Yan',
        'email_address': 'admin@email.com',
        'first_name': 'Yan',
        'last_name': 'Su',
        'staff_status': true,
    },
    {
        'id': '10',
        'username': 'Su-Yan',
        'email_address': 'admin@email.com',
        'first_name': 'Yan',
        'last_name': 'Su',
        'staff_status': true,
    },
];

const ChangeListTable = () => {
    const [pageSize, setPageSize] = useState(6);
    const [selectionModel, setSelectionModel] = useState([]);
    const [selectedAction, setSelectedAction] = useState('');
    const [actions, setActions] = useState(['', 'Delete selected']);
    const [status, setStatus] = useState('finished');
    const [filters, setFilters] = useState(['staff_status', 'super_user_status']);
    const [filtersValues, setFiltersValues] = useState({});

    const theme = useTheme();

    const onPageSizeChange = event => setPageSize(event.target.value);

    const handleFiltersValuesChange = (event, name) => { setFilters({ ...filters, [name]: event.target.value }) };

    const onSelectionModelChange = newSelectionModel => setSelectionModel(newSelectionModel)

    useEffect(() => {
        setTimeout(() => {
            setStatus('finished');
        }, 2000)
    })

    return (
        <Box sx={{ width: '100%', height: '70vh' }}>
            <Box sx={{ height: '100%', }}>
                {
                    status === 'loading'
                        ? (
                            <TableLoadingSkeleton />
                        )

                        : (
                            <Table
                                autoHeight={rows.length > 0 ? true : false}
                                rows={rows}
                                columns={columns}
                                pageSize={pageSize}
                                rowsPerPageOptions={[6, 10, 20]}
                                checkboxSelection
                                disableSelectionOnClick
                                selectionModel={selectionModel}
                                onSelectionModelChange={onSelectionModelChange}
                                components={{
                                    Toolbar: TableToolbar,
                                    Pagination: TablePagination,
                                    NoRowsOverlay: TableEmptyOverlay,
                                    LoadingOverlay: LinearProgress,
                                }}
                                componentsProps={{
                                    pagination: { counter: rows.length, pageSize, rowsPerPageOptions: [6, 10, 20], onPageSizeChange },
                                    toolbar: { selectionModel, actions, selectedAction, filters, filtersValues, handleFiltersValuesChange }
                                }}
                            />
                        )
                }
            </Box>
        </Box>
    )
};


export default ChangeListTable;