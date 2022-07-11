import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from '@mui/material/FormLabel';
import ListSubheader from '@mui/material/ListSubheader';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuList from '@mui/material/MenuList';
import Listitem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import Radio from '@mui/material/Radio';
import RadioGroup from "@mui/material/RadioGroup";
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/system";
import FeatherIcon from "feather-icons-react";
import { useState } from "react";

const ChevronDown = () => {
    return (<FeatherIcon icon="chevron-down" size={24} />)
};

const TableToolbarWrap = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(5, 5, 6, 5),
    borderRadius: '12px 12px 0 0',

    '.feather': {
        color: theme.palette.grey[300],
        strokeWidth: '1.5px',
    }
}));

const TableTitle = styled(Typography)(({ theme }) => ({

    [theme.breakpoints.down("md")]: {
        display: 'none',
    },
}));

const SearchField = styled(TextField)(({ theme }) => ({
    color: theme.palette.text.secondary,
    borderRadius: '12px',

    [theme.breakpoints.down("md")]: {
        flexGrow: 1,
    },

    '& label.Mui-focused': {
        color: theme.palette.text.secondary,
    },

    '& .MuiOutlinedInput-root': {
        height: '49px',

        '& fieldset': {
            borderColor: theme.palette.border,
        },
        '&:hover fieldset': {
            borderColor: theme.palette.border,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.border,
        },
    },
}));

const ToolbarFilterButton = styled(Button)(({ theme }) => ({
    borderColor: theme.palette.border,
    borderRadius: '12px',

    minWidth: '0',
    width: '49px',
    height: '49px',
    marginLeft: theme.spacing(3),

    // some how this changes the active color
    color: theme.palette.grey[300],

    '&:hover': {
        borderColor: theme.palette.border,
        backgroundColor: theme.palette.grey[100],
    },

    '&:active': {
        backgroundColor: theme.palette.grey[100],
    },

    '&:focus': {
        backgroundColor: theme.palette.grey[100],
    },
}));

const ToolbarActionMenu = styled(TextField)(({ theme }) => ({
    border: 'none',
    color: theme.palette.text.secondary,
    borderRadius: '12px',
    minWidth: '233px',

    [theme.breakpoints.down("md")]: {
        flexGrow: 1,
    },

    '& label.Mui-focused': {
        color: theme.palette.text.secondary,
    },

    '.MuiFilledInput-root': {
        height: '49px',
        borderRadius: "12px",
        backgroundColor: theme.palette.background.paper,
        '&:hover': {
            backgroundColor: theme.palette.grey[100],
        }
    },
    '.MuiSelect-filled': {},
    '.feather': {
        marginRight: theme.spacing(5),
    }
}));

const ToolbarActionButton = styled(ToolbarFilterButton)(({ theme }) => ({
    background: theme.palette.background.paper,
    border: 'none'
}));

const FilterMenu = ({ open, filters, filtersValues, handleChange, anchorEl, handleClose }) => {
    const theme = useTheme();

    return (
        <Menu open={open} onClose={handleClose} anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}>
            <Paper sx={{ width: "200px" }}>
                <MenuList subheader={
                    <ListSubheader component="div" id="nested-list-subheader" sx={{ color: theme.palette.text.primary, fontWeight: '400' }}>
                        Filters
                    </ListSubheader>
                }>
                    {
                        filters.map((filter) => {
                            let name = `filter_by_${filter}`;

                            return (
                                <Listitem key={name}>
                                    <FormControl>
                                        <FormLabel id={name}>{name.replace(/_/g, ' ')}</FormLabel>
                                        <RadioGroup
                                            aria-labelledby={name}
                                            name={name}
                                            value={filtersValues[name]}
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel value="All" control={<Radio />} label="All" />
                                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="No" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </Listitem>
                            )
                        })
                    }
                </MenuList>
            </Paper>
        </Menu>
    )
};

const TableToolbar = (props) => {
    const theme = useTheme();
    const [anchorElement, setAnchorElement] = useState(null);
    const open = Boolean(anchorElement);

    const handleToggleMenu = (event) => { setAnchorElement(event.currentTarget) };

    const handleClose = () => { setAnchorElement(null); };

    return (
        <>
            <FilterMenu open={open} filters={props.filters} filtersValues={props.filtersValues} handleChange={props.handleChange} anchorEl={anchorElement} handleClose={handleClose} />
            <TableToolbarWrap sx={{ background: props.selectionModel.length <= 0 ? theme.palette.background.paper : theme.palette.primary.light }}>
                <TableTitle variant="h5" color="text.primary"
                    sx={{
                        flexGrow: '1',
                        color: props.selectionModel.length <= 0 ? theme.palette.text.primary : theme.palette.primary.dark,
                    }}>
                    {props.selectionModel.length > 0 ? props.selectionModel.length + ' users selected' : 'Users List'}
                </TableTitle>
                {props.selectionModel.length <= 0
                    ? (<>
                        <SearchField id="changelist-search" label="Search" variant="outlined"
                            InputProps={{
                                endAdornment: <FeatherIcon icon="search" size={24} />,
                            }} />
                        <ToolbarFilterButton variant="outlined" onClick={handleToggleMenu}>
                            <FeatherIcon icon="filter" size={24} />
                        </ToolbarFilterButton>
                    </>)

                    : (<>
                        <ToolbarActionMenu
                            select
                            label="Select Action"
                            value={props.selectedAction}
                            variant="filled"
                            SelectProps={{
                                IconComponent: ChevronDown,
                            }}
                            InputProps={{
                                disableUnderline: true,
                            }}
                        >
                            {props.actions.map((action) => (
                                <MenuItem key={action} value={action}>
                                    {action}
                                </MenuItem>
                            ))}
                        </ToolbarActionMenu>

                        <ToolbarActionButton variant="contained">
                            <FeatherIcon icon="check-circle" size={24} />
                        </ToolbarActionButton>
                    </>)
                }
            </TableToolbarWrap >
        </>

    )
};


export default TableToolbar;