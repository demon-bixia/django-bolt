import { Box, IconButton, Link, Menu, MenuItem, Pagination, Paper, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/system";
import FeatherIcon from "feather-icons-react";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";


const ApplicationListWrap = styled(Box)(({ theme }) => ({
    width: 'auto', flexGrow: 1,

    [theme.breakpoints.down("md")]: {
        width: '100%', marginTop: theme.spacing(7), marginLeft: theme.spacing(0), order: 1,
    },
}));

const VerticalWrap = styled(Box)(({ theme }) => ({
    maxWidth: "400px", display: 'flex', flexDirection: "column", [theme.breakpoints.down("md")]: {
        maxWidth: "initial",
    },
}));

const ApplicationList = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(3),
}));

const Application = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(6)
}));

const Model = styled(Paper)(({ theme }) => ({
    marginBottom: theme.spacing(4),
    padding: theme.spacing(3, 4),
    borderRadius: "16px",
    minWidth: { "md": "400px", "xs": "0" },
    display: "flex",
    alignItems: "center",
}));

const MoreIconButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.grey[300]
}));

const ApplicationPagination = styled(Pagination)(({ theme }) => ({
    '.MuiPaginationItem-root': {
        border: '0px', background: theme.palette.background.paper, color: theme.palette.text.secondary,
    }, '.Mui-selected': {
        background: `${theme.palette.primary.light}`,
    }, alignSelf: 'end',
}));

const Applications = ({ appList }) => {
    const theme = useTheme();
    const [menuToggles, setMenuToggles] = useState({});
    const [anchorElements, setAnchorElements] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [startingItemIndex, setStartingItemIndex] = useState(0)
    const page_size = 3;

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
        setMenuToggles({ ...menuToggles, [model_name]: true });
        setAnchorElements({ ...anchorElements, [model_name]: currentTarget });
    };

    const handleMenuClose = (model_name) => {
        setAnchorElements({});
        setMenuToggles({ ...menuToggles, [model_name]: false });
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        setStartingItemIndex((value * page_size) - (page_size));
    };

    let filteredAppList = appList.filter((app, index) => ((index >= startingItemIndex) && (index < startingItemIndex + page_size)))

    return (<ApplicationListWrap>
        <VerticalWrap>
            <ApplicationList className="applications-list" role="main">
                {/* list of apps */}
                {filteredAppList.map((app, index) => (
                    <Application className="application" key={app.name} role="list">
                        <Typography underline="none" tabIndex={0} variant="h5" sx={{ fontWeight: "500", marginBottom: theme.spacing(5), }} >
                            {app.name.replace(/_/g, ' ')}
                        </Typography>

                        {/* list of models */}
                        {app.models.map((model) => {
                            let model_name = `${app.name}_${model.name}`;

                            return (<Model key={model_name} elevation={0} role="listitem">
                                <Box sx={{ flexGrow: 1, }}>
                                    <Link
                                        aria-label={model.name}
                                        underline="none" variant="body1" component={RouterLink}
                                        sx={{ color: theme.palette.text.secondary }}
                                        to={`/${app.app_label}/${model.name}/changelist/`}
                                    >
                                        {model.name}
                                    </Link>
                                </Box>
                                <MoreIconButton aria-controls={menuToggles[model_name] ? 'model-menu' : undefined}
                                    aria-expanded={menuToggles[model_name] ? 'true' : undefined}
                                    aria-haspopup="true"
                                    onClick={(event) => handleMenuOpen([model_name, event.currentTarget])}
                                    aria-label="more actions"
                                >
                                    <FeatherIcon icon="more-horizontal" size={16} />
                                </MoreIconButton>
                                <Menu open={menuToggles[model_name] || false}
                                    anchorEl={anchorElements[model_name]}
                                    onClose={() => handleMenuClose(model_name)}>
                                    <MenuItem>
                                        <Link
                                            underline="none"
                                            aria-label={`add ${model.name}`}
                                            component={RouterLink}
                                            to={`/${app.app_label}/${model.name}/add/`}
                                            sx={{ color: theme.palette.text.primary }}

                                        >
                                            Add a new {model.name.slice(0, -1)}
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link
                                            underline="none"
                                            aria-label={`${model.name} changelist`}
                                            component={RouterLink}
                                            to={`/${app.app_label}/${model.name}/changelist/`}
                                            sx={{ color: theme.palette.text.primary }}
                                        >
                                            Update existing {model.name}
                                        </Link>
                                    </MenuItem>
                                </Menu>
                            </Model>);
                        })}
                    </Application>
                ))}
                {/* empty state */}
                {appList.length <= 0
                    ? (
                        <Application>
                            <Box sx={{
                                background: `${theme.palette.background.paper}`,
                                padding: theme.spacing(4),
                                borderRadius: '16px',
                            }}>
                                <Typography variant="h5" sx={{ fontWeight: "500", marginBottom: theme.spacing(2), }}>
                                    No Models Registered
                                </Typography>
                                <Typography variant="body1"
                                    sx={{ color: theme.palette.text.secondary, fontWeight: '300' }}
                                    component='p'>
                                    Registered models will appear here. Register them in your admin.py files.
                                </Typography>
                            </Box>
                        </Application>
                    )
                    : null
                }
            </ApplicationList>

            {/* pagination */}
            {
                appList.length <= page_size
                    ? null
                    : (<ApplicationPagination count={Math.ceil(appList.length / page_size)} page={currentPage}
                        onChange={handlePageChange} variant="outlined" shape="rounded" />)
            }

        </VerticalWrap>
    </ApplicationListWrap>);
};

export default Applications;
