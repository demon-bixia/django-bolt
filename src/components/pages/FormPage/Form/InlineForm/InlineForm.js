import { Box, Chip, IconButton } from "@mui/material";
import { styled, useTheme } from "@mui/system";
import FeatherIcon from "feather-icons-react";
import { renderFormFields } from "../utils";
import { toCamelCase } from "../utils";

const RemoveButton = styled(IconButton)(({ theme }) => ({
    border: `1px solid ${theme.palette.border}`, color: theme.palette.grey[300]
}));

const InlineForm = ({
    formRef,
    inline,
    removeInstance,
    index,
    status,
    submitStatus,
    serializerFields,
    handleFormSubmit,
    handleRemoveNonFieldErrors,
    nonFieldErrors,
    ...props
}) => {
    const theme = useTheme();

    const submitForm = (event) => {
        handleFormSubmit();
    };

    return (
        <Box sx={{ marginBottom: theme.spacing(3) }}>
            <Box sx={{ display: 'flex', marginBottom: theme.spacing(5) }}>
                <Box sx={{ flexGrow: '1' }}>
                    <Chip
                        label={`${toCamelCase(inline.object_name)} #${index + 1}`}
                        variant="outlined"
                        sx={{
                            minWidth: '40px', borderColor: theme.palette.border, color: theme.palette.grey[300]
                        }}
                    />
                </Box>
                <Box>
                    <RemoveButton onClick={event => removeInstance(inline.admin_name, index)}>
                        <FeatherIcon icon="x" size={12} />
                    </RemoveButton>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                {renderFormFields(inline.config, serializerFields, props)}
            </Box>

            <input type="hidden" onClick={submitForm} ref={formRef} />
        </Box>
    );
};

export default InlineForm;