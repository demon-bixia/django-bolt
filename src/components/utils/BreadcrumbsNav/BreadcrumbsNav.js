import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from "react-router-dom";
import { styled, useTheme } from "@mui/system";
import Box from "@mui/material/Box";

const getLink = (pathnames, plural, page) => {
    if (page)
        return pathnames[0]
    else
        if (plural)
            return pathnames[1]
        else
            return pathnames[1].slice(0, -1)
};

const BreadcrumbSeparator = styled(Box)(({ theme }) => ({
    width: '3px', height: '3px', marginTop: '1px', borderRadius: '100%', background: theme.palette.grey[300],
}));

const BreadcrumbsNav = ({ pathnames, plural = true, prefix = '', page = false }) => {
    const theme = useTheme();

    return (<Breadcrumbs aria-label="breadcrumb" separator={<BreadcrumbSeparator />}>
        <Link
            to="/"
            component={RouterLink}
            aria-label="home page"
            underline="none"
            color={theme.palette.text.primary}
        >
            Home
        </Link>

        <Typography
            color={theme.palette.text.secondary}
            tabIndex='0'
        >
            {prefix + ' '}
            {getLink(pathnames, plural, page)}
        </Typography>
    </Breadcrumbs>);
};

export default BreadcrumbsNav;
