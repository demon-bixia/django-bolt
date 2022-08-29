import { Link } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from '@mui/material/FormLabel';
import ListItem from "@mui/material/ListItem";
import ListSubheader from '@mui/material/ListSubheader';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuList from '@mui/material/MenuList';
import Radio from '@mui/material/Radio';
import RadioGroup from "@mui/material/RadioGroup";
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/system";
import FeatherIcon from "feather-icons-react";
import { useState } from "react";
import SearchField from "../../../../forms/fields/SearchField";
import ToolbarFilterButton from "../../../../utils/ToolbarFilterButton";


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
    },

    [theme.breakpoints.down("md")]: {
        flexDirection: 'column',
    },
}));

const TableTitleWrap = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    flexGrow: 1,

    [theme.breakpoints.down("md")]: {
        width: '100%',
        marginBottom: theme.spacing(5),
    },
}));

const ToolbarActionWrap = styled(Box)(({ theme }) => ({
    display: 'flex',
    [theme.breakpoints.down("md")]: {
        flexGrow: 1,
        width: '100%',
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

const FilterMenu = ({ open, filters_list, filters, handleChange, anchorEl, handleClose }) => {
    const theme = useTheme();

    return (
        <Menu
            role="region"
            id="filter_menu"
            aria-labelledby="filter_menu_button"
            open={open}
            onClose={handleClose}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}>
            <MenuList subheader={
                <ListSubheader component="div" id="nested-list-subheader" sx={{ color: theme.palette.text.primary, fontWeight: '400' }}>
                    Filters
                </ListSubheader>}
                sx={{ height: "350px", width: "190px" }}
            >
                {
                    filters_list.map((filter) => {
                        let name = `filter_by_${filter.title}`;

                        return (
                            <ListItem key={name}>
                                <FormControl>
                                    <FormLabel id={name}>{name.replace(/_/g, ' ')}</FormLabel>
                                    <RadioGroup
                                        aria-labelledby={name}
                                        name={name}
                                        value={filters[name] || filter.choices[0].query_string}
                                        onChange={(event) => handleChange(event, name)}
                                    >
                                        {
                                            filter.choices.map((choice, index) => (
                                                <FormControlLabel key={index} value={choice.query_string} control={<Radio />} label={choice.display} />
                                            ))
                                        }
                                    </RadioGroup>
                                </FormControl>
                            </ListItem>
                        )
                    })
                }
            </MenuList>
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
            <TableToolbarWrap sx={{ background: props.selectionModel.length > 0 || props.selectAcross ? theme.palette.primary.light : theme.palette.background.paper }}>
                {props.selectionModel.length > 0 || props.selectAcross
                    /* selection on */
                    ? (<TableTitleWrap>
                        <Typography
                            variant="h5"
                            tabIndex={1}
                            sx={{
                                color: theme.palette.primary.dark,
                                marginRight: theme.spacing(3),
                                display: props.selection_counter ? 'block' : 'none'
                            }}
                        >
                            {
                                props.selectAcross
                                    ? (`all authors selected`)
                                    : (`${props.selectionModel.length} ${props.modelName.toLowerCase()} selected.`)
                            }

                        </Typography>

                        <Link
                            onClick={props.handleToggleSelectAcross}
                            aria-label={`select all ${props.modelName.toLowerCase()}`}
                            href="#"
                        >
                            {
                                props.selectAcross
                                    ? (`unselect all`)
                                    : (`select all ${props.counter} ${props.modelName.toLowerCase()}`)
                            }

                        </Link>
                    </TableTitleWrap>)

                    /* selection off */
                    : (<TableTitleWrap>
                        <Typography variant="h5"
                            sx={{
                                color: theme.palette.text.primary,
                                fontWeight: '500',
                            }}
                        >
                            {props.modelName} List
                        </Typography>
                    </TableTitleWrap>)
                }

                {props.selectionModel.length > 0 || props.selectAcross
                    /* perform actions */
                    ? (<ToolbarActionWrap>
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
                            onChange={props.handleActionSelectChange}
                        >
                            {props.actions.map((action) => (
                                <MenuItem key={action[0]} value={action[0]}>
                                    {action[1]}
                                </MenuItem>
                            ))}
                        </ToolbarActionMenu>

                        <ToolbarActionButton variant="contained" onClick={props.handlePerformAction}>
                            <FeatherIcon icon="check-circle" size={24} />
                        </ToolbarActionButton>
                    </ToolbarActionWrap>)

                    /* search and filter */
                    : (<ToolbarActionWrap>
                        <SearchField
                            id="changelist-search"
                            label="Search"
                            variant="outlined"
                            sx={{ display: props.searchFields.length > 0 ? 'block' : 'none' }}
                            InputProps={{
                                endAdornment: <FeatherIcon icon="search" size={24} />,
                                onInput: event => {
                                    let value = Boolean(event.target.value) ? `?q=${event.target.value}` : '?';
                                    props.handleSearchFilterChange(value, 'filter_by_search');
                                },
                            }}
                        />
                        <ToolbarFilterButton
                            variant="outlined"
                            aria-controls="filter_menu"
                            id="filter_menu_button"
                            aria-label="filter"
                            aria-expanded={open}
                            onClick={handleToggleMenu}
                            sx={{ display: props.filters_list.length > 0 ? 'flex' : 'none' }}
                        >
                            <FeatherIcon icon="filter" size={24} />
                        </ToolbarFilterButton>
                    </ToolbarActionWrap>)
                }
            </TableToolbarWrap >

            <FilterMenu open={open} filters_list={props.filters_list} filters={props.filters} handleChange={props.handleFiltersChange} anchorEl={anchorElement} handleClose={handleClose} />
        </>
    );
};


export default TableToolbar;