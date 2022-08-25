import { Box, Link, Paper, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/system";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import DynamicField from "../../../forms/fields/DynamicField";
import PrimaryGradientButton from "../../../utils/buttons/PrimaryGradientButton";
import { setAlertInfo } from "../formPageSlice";
import { renderFormFields } from "./utils";

export const FormBackground = styled(Paper)(({ theme }) => ({
    width: '100%',
    padding: theme.spacing(5),
    borderRadius: '12px',
    marginBottom: theme.spacing(6),
}));

const FormTitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: '500',
    marginBottom: theme.spacing(7)
}));

export const Section = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(6)
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(6),
    color: theme.palette.text.primary,
    fontWeight: '300',
}));

export const Group = styled(Box)(({ theme }) => ({
    display: 'flex',
    width: '100%',

    '& .form-input:nth-of-type(1)': {
        marginRight: theme.spacing(4)
    }
}));

export const FormInput = styled(DynamicField)(({ theme }) => ({
    marginBottom: theme.spacing(5),
    width: '100%',
}));

const FormActions = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
}));

const Form = ({
    action = false,
    config,
    inlines,
    appLabel,
    modelName,
    status,
    submitStatus,
    serializerFields,
    handleFormSubmit,
    handleRemoveNonFieldErrors,
    nonFieldErrors,
    ...props
}) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const closeAlert = () => {
        dispatch(setAlertInfo({
            open: false,
            severity: 'success',
            message: '',
        }));
    };

    const handleFormsSubmit = (event) => {
        handleFormSubmit(event)
            .then((response) => {
                // if the main form is successful.
                if ([201, 200].includes(response.status)) {
                    // save the new primary key
                    let newPk = response.data.data.pk;
                    // redirect to the aproperiate page.
                    dispatch(
                        setAlertInfo({
                            open: true,
                            severity: 'success',
                            message: (<span>
                                {modelName.slice(0, -1).toLowerCase()} created successfuly &nbsp;
                                <Link component={RouterLink} to={`/${appLabel}/${modelName}/${newPk}/change/`} onClick={closeAlert}>
                                    edit {modelName.toLowerCase()}
                                </Link>
                            </span>),
                        })
                    );

                    // check what url we should choose.
                    navigate(`/${appLabel}/${modelName}/changelist/`);
                }
            });
    };


    return (
        <Box>
            {/* set form fields */}
            <FormBackground elevation={0}>
                <FormTitle variant="h5">{action === 'add' ? 'Add' : 'Change'} {modelName.slice(0, -1)}</FormTitle>
                {/* render admin form fields */}
                {renderFormFields(config, serializerFields, props)}
            </FormBackground>

            <FormActions>
                <PrimaryGradientButton variant="contained" onClick={handleFormsSubmit}>Save</PrimaryGradientButton>
            </FormActions>
        </Box >
    );
};

export default Form;