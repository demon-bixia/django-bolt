import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from "@mui/material/Button";
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/system';
import { useSelector } from 'react-redux';
import { Link as RouterLink, useLocation } from "react-router-dom";
import { selectStatus } from '../../IndexPage';


const ChangeListHeaderWrap = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(6),
}));

const PrimaryGradientButton = styled(Button)(({ theme }) => ({
    background: theme.palette.primaryGradient.main,
    height: '35px',
    boxShadow: theme.shadows[0],
    padding: theme.spacing(5),
    borderRadius: '12px',
}));


const BreadcrumbSeparator = styled(Box)(({ theme }) => ({
    width: '3px',
    height: '3px',
    marginTop: '1px',
    borderRadius: '100%',
    background: theme.palette.grey[300],
}));

const ChangeListHeader = ({ model }) => {
    const theme = useTheme();
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);
    const status = useSelector(selectStatus);

    return (
        <ChangeListHeaderWrap>

            {status === 'success'
                ? (
                    <>
                        {/* breadcrumb navigation */}
                        <Breadcrumbs aria-label="breadcrumb" separator={<BreadcrumbSeparator />}>
                            <Link
                                component={RouterLink}
                                underline="none"
                                to="/"
                                color={theme.palette.text.primary}
                            >
                                Home
                            </Link>

                            <Typography
                                color={theme.palette.text.secondary}
                            >
                                {pathnames[1]}
                            </Typography>
                        </Breadcrumbs>

                        {/* changelist primary button */}
                        <PrimaryGradientButton variant="contained" >
                            Add {model.object_name}
                        </PrimaryGradientButton>
                    </>
                )
                : null
            }
        </ChangeListHeaderWrap >
    );

};

export default ChangeListHeader;
