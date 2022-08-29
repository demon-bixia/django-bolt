import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { useLocation } from "react-router-dom";
import BreadcrumbsNav from "../../../utils/BreadcrumbsNav";

const ActivityHeaderWrap = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(7),
}));

const ActivityHeader = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <ActivityHeaderWrap>
            {/* breadcrumb navigation */}
            <BreadcrumbsNav pathnames={pathnames} page={true} />
        </ActivityHeaderWrap>
    );
};

export default ActivityHeader;