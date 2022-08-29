import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { selectStatus } from '../../IndexPage';
import { useSelector } from "react-redux";
import BreadcrumbsNav from "../../../utils/BreadcrumbsNav";
import { useLocation } from "react-router-dom";
import WhiteButton from "../../../utils/buttons/WhiteButton";
import FeatherIcon from "feather-icons-react";
import { Link as RouterLink } from "react-router-dom";

const FormHeaderWrap = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(6),
}));

const FormHeader = ({ action, objectId = null }) => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);
    const status = useSelector(selectStatus);

    return (
        <FormHeaderWrap>
            {status === 'success'
                ? (
                    <>
                        {/* breadcrumb navigation */}
                        <BreadcrumbsNav pathnames={pathnames} prefix={action} plural={false} />
                    </>
                )
                : null
            }

            <>
                {
                    action === 'change'
                        ? (
                            <WhiteButton
                                endIcon={<FeatherIcon size={16} icon='clock' />}
                                underline="none"
                                aria-label={`history`}
                                component={RouterLink}
                                to={`/Activity/${objectId}/`}
                            >
                                History
                            </WhiteButton>
                        )
                        : null
                }
            </>

        </FormHeaderWrap>
    );
};

export default FormHeader;
