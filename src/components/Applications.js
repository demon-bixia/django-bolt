import {styled, useTheme} from "@mui/system";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import FeatherIcon from "feather-icons-react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useEffect, useState} from "react";
import Pagination from '@mui/material/Pagination';

const ApplicationPagination = styled(Pagination)(({theme}) => ({
    '.MuiPaginationItem-root': {
        border: '0px',
        background: theme.palette.background.paper,
        color: theme.palette.text.secondary,
    },
    '.Mui-selected': {
        background: `${theme.palette.primary.light} !important`,
    },
}));

const Applications = ({appList}) => {
    const theme = useTheme();
    const [menuToggles, setMenuToggles] = useState({});
    const [anchorElements, setAnchorElements] = useState({});

    useEffect(() => {
        let menuList = {};
        let anchorElementsList = {};
        for (let app of appList) {
            for (let model of app.models) {
                menuList[`${app.name}_${model.name}`] = false;
            }
        }
        setMenuToggles(menuList);
        setAnchorElements(anchorElementsList);
    }, [appList]);

    const handleMenuOpen = ([model_name, currentTarget]) => {
        setMenuToggles({...menuToggles, [model_name]: true});
        setAnchorElements({...anchorElements, [model_name]: currentTarget});
    };

    const handleMenuClose = (model_name) => {
        setAnchorElements({});
        setMenuToggles({...menuToggles, [model_name]: false});
    };


    return (<Box sx={{marginLeft: theme.spacing(8), flexGrow: 1,}}>
        <Box sx={{maxWidth: "400px", display: 'flex', flexDirection: "column",}}>
            <Box className="applications-list" sx={{marginBottom: theme.spacing(3),}}>
                {/* list of apps */}
                {appList.map((app) => (
                    <Box className="application" key={app.name} sx={{marginBottom: theme.spacing(6),}}>
                        <Typography variant="h5" sx={{fontWeight: "500", marginBottom: theme.spacing(5),}}>
                            {app.name}
                        </Typography>
                        {app.models.map((model) => {
                            let model_name = `${app.name}_${model.name}`;
                            return (<Paper key={model_name} elevation={0} sx={{
                                marginBottom: theme.spacing(4),
                                padding: theme.spacing(3, 4),
                                borderRadius: "16px",
                                minWidth: "400px",
                                display: "flex",
                                alignItems: "center",
                            }}>
                                <Box sx={{flexGrow: 1,}}>
                                    <Link href="#" underline="none" variant="body1"
                                          sx={{color: theme.palette.text.secondary}}>
                                        {model.name}
                                    </Link>
                                </Box>
                                <IconButton aria-controls={menuToggles[model_name] ? 'model-menu' : undefined}
                                            aria-expanded={menuToggles[model_name] ? 'true' : undefined}
                                            aria-haspopup="true"
                                            onClick={(event) => handleMenuOpen([model_name, event.currentTarget])}
                                            aria-label="more actions"
                                            sx={{color: theme.palette.grey[300]}}>
                                    <FeatherIcon icon="more-horizontal" size={16}/>
                                </IconButton>
                                <Menu open={menuToggles[model_name] || false}
                                      anchorEl={anchorElements[model_name]}
                                      onClose={() => handleMenuClose(model_name)}>
                                    <MenuItem>Add a new {model.name.slice(0, -1)}</MenuItem>
                                    <MenuItem>Update existing {model.name}</MenuItem>
                                </Menu>
                            </Paper>);
                        })}
                    </Box>))}
            </Box>
            {/* pagination */}
            <ApplicationPagination count={3} variant="outlined" shape="rounded" sx={{alignSelf: 'end',}}/>
        </Box>
    </Box>);
};

export default Applications;
