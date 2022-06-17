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

const ApplicationListWrap = styled(Box)(({theme}) => ({
    width: 'auto', marginTop: theme.spacing(0), marginLeft: theme.spacing(8), flexGrow: 1,

    [theme.breakpoints.down("md")]: {
        width: '100%', marginTop: theme.spacing(6), marginLeft: theme.spacing(0), order: 1,
    },
}));

const VirticalWrap = styled(Box)(({theme}) => ({
    maxWidth: "400px", display: 'flex', flexDirection: "column", [theme.breakpoints.down("md")]: {
        maxWidth: "initial",
    },
}));

const ApplicationList = styled(Box)(({theme}) => ({
    marginBottom: theme.spacing(3),
}));

const Application = styled(Box)(({theme}) => ({
    marginBottom: theme.spacing(6)
}));

const Model = styled(Paper)(({theme}) => ({
    marginBottom: theme.spacing(4),
    padding: theme.spacing(3, 4),
    borderRadius: "16px",
    minWidth: {"md": "400px", "xs": "0"},
    display: "flex",
    alignItems: "center",
}));

const MoreIconButton = styled(IconButton)(({theme}) => ({
    color: theme.palette.grey[300]
}));

const ApplicationPagination = styled(Pagination)(({theme}) => ({
    '.MuiPaginationItem-root': {
        border: '0px', background: theme.palette.background.paper, color: theme.palette.text.secondary,
    }, '.Mui-selected': {
        background: `${theme.palette.primary.light}`,
    }, alignSelf: 'end',
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


    return (<ApplicationListWrap>
        <VirticalWrap>
            <ApplicationList className="applications-list">
                {/* list of apps */}
                {appList.map((app) => (<Application className="application" key={app.name}>
                    <Typography variant="h5" sx={{fontWeight: "500", marginBottom: theme.spacing(5),}}>
                        {app.name}
                    </Typography>
                    {app.models.map((model) => {
                        let model_name = `${app.name}_${model.name}`;
                        return (<Model key={model_name} elevation={0}>
                            <Box sx={{flexGrow: 1,}}>
                                <Link href="django-bolt/src/components/pages/IndexPage/Applications#"
                                      underline="none" variant="body1"
                                      sx={{color: theme.palette.text.secondary}}>
                                    {model.name}
                                </Link>
                            </Box>
                            <MoreIconButton aria-controls={menuToggles[model_name] ? 'model-menu' : undefined}
                                            aria-expanded={menuToggles[model_name] ? 'true' : undefined}
                                            aria-haspopup="true"
                                            onClick={(event) => handleMenuOpen([model_name, event.currentTarget])}
                                            aria-label="more actions"
                            >
                                <FeatherIcon icon="more-horizontal" size={16}/>
                            </MoreIconButton>
                            <Menu open={menuToggles[model_name] || false}
                                  anchorEl={anchorElements[model_name]}
                                  onClose={() => handleMenuClose(model_name)}>
                                <MenuItem>Add a new {model.name.slice(0, -1)}</MenuItem>
                                <MenuItem>Update existing {model.name}</MenuItem>
                            </Menu>
                        </Model>);
                    })}
                </Application>))}
            </ApplicationList>
            {/* pagination */}
            <ApplicationPagination count={3} variant="outlined" shape="rounded"/>
        </VirticalWrap>
    </ApplicationListWrap>);
};

export default Applications;
