import { getMuiInputComponent, getInputProps } from "../../utils";
import { Alert, AlertTitle } from "@mui/material";
import { useTheme } from "@mui/system";

// renders the best material ui input element based on drf serializer field type and attributes.
const DynamicField = ({ serializerField, errors, values, ...props }) => {
    const theme = useTheme();
    const inputProps = getInputProps(serializerField);

    let InputComponent;
    let hasError = false;

    try {
        InputComponent = getMuiInputComponent(serializerField);
    } catch (error) {
        hasError = true;
    }

    return (
        <>
            {
                hasError
                    ? (

                        <Alert severity="error" variant="filled" sx={{ backgroundColor: theme.palette.error.light, color: theme.palette.error.dark }}>
                            <AlertTitle>Not supported</AlertTitle>
                            This field is not supported.
                        </Alert>
                    )
                    : (
                        <InputComponent
                            {...props}
                            inputProps={inputProps}
                            serializerField={serializerField}
                            value={values[serializerField.name]}
                            errors={errors[serializerField.name] || []}
                        />
                    )
            }
        </>
    );
};

export default DynamicField;
