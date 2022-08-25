import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import { selectStatus } from '../../IndexPage';
import BreadcrumbsNav from "../../../utils/BreadcrumbsNav";
import PrimaryGradientButton from "../../../utils/buttons/PrimaryGradientButton";
import { Link as RouterLink, useParams } from "react-router-dom";

const ChangeListHeaderWrap = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(6),
}));

const ChangeListHeader = ({ model }) => {
    const location = useLocation();
    const { appLabel, modelName } = useParams();
    const status = useSelector(selectStatus);
    const pathnames = location.pathname.split('/').filter((x) => x);
    const url = `/${appLabel}/${modelName}/add/`;

    return (
        <ChangeListHeaderWrap>

            {status === 'success'
                ? (
                    <>
                        {/* breadcrumb navigation */}
                        <BreadcrumbsNav pathnames={pathnames} />

                        {/* changelist primary button */}
                        <PrimaryGradientButton
                            variant="contained"
                            aria-label={`Add ${model.object_name}`}
                            component={RouterLink}
                            to={url}
                        >
                            Add {model.object_name}
                        </PrimaryGradientButton>
                    </>
                )
                : null
            }
        </ChangeListHeaderWrap>
    );
};

export default ChangeListHeader;
