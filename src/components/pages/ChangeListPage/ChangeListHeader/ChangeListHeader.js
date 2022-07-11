import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import { styled, typography, useTheme } from '@mui/system';


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

const ChangeListHeader = () => {
    const theme = useTheme();

    return (
        <ChangeListHeaderWrap>
            {/* breadcrumb navigation */}
            <Breadcrumbs aria-label="breadcrumb" separator={<BreadcrumbSeparator />}>
                <Link
                    underline="none"
                    href="#"
                    color={theme.palette.text.primary}
                >
                    Home
                </Link>

                <Typography color={theme.palette.text.secondary} >
                    Users List
                </Typography>
            </Breadcrumbs>

            {/* changelist primary button */}
            <PrimaryGradientButton variant="contained" >
                Add User
            </PrimaryGradientButton>
        </ChangeListHeaderWrap>
    );
};

export default ChangeListHeader;
