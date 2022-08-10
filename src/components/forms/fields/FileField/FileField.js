import { Box, Button, TextField } from "@mui/material";
import { styled, useTheme } from '@mui/system';
import FeatherIcon from "feather-icons-react";
import { useRef, useState } from "react";

const FileUploadField = styled(TextField)(({ theme }) => ({

    cursor: "pointer",

    ".MuiInputBase-adornedEnd": {
        cursor: "pointer",
    },

    ".MuiInputBase-inputAdornedEnd": {
        cursor: "pointer",
    }
}));

const FileField = ({
    serializerField: { attrs, type: fieldType, name },
    errors,
    value,
    fieldInputValue,
    inputProps,
    handleValuesChange,
    handleRemoveErrors,
    ...props }) => {

    const fileInputRef = useRef(null);
    const theme = useTheme();
    const [displayValue, setDisplayValue] = useState('');

    const openFileInput = (event) => {
        fileInputRef.current.click();
        return handleRemoveErrors(event, name); // for removing errors when clicking
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'start', }}>
            <FileUploadField
                {...props}
                label={attrs['label'] || ''}
                error={errors.length > 0}
                value={displayValue || 'No file chosen'}
                helperText={
                    errors.length > 0
                        ? errors.join('.\n')
                        : attrs['help_text'] || ''
                }
                inputProps={inputProps}
                onClick={openFileInput}
                sx={{ margin: theme.spacing(0, 2, 0, 0), flexBasis: '60%' }}
            />

            <Box sx={{ flexBasis: '40%', }}>
                <Button variant="contained"
                    sx={{
                        padding: theme.spacing(4),
                        minWidth: '10px',
                        width: '53px',
                        height: '53px',
                        background: theme.palette.primaryGradient.main,

                    }}
                    onClick={openFileInput}
                >
                    <FeatherIcon icon="upload" size={20} />
                </Button>
            </Box>

            <input ref={fileInputRef} type="file" hidden onChange={
                event => {
                    let file = event.target.files[0];
                    if (!file) {
                        setDisplayValue('No file chosen')
                        handleValuesChange(null, name, { name, type: fieldType, attrs });
                    } else {
                        setDisplayValue(file ? file.name : '')
                        handleValuesChange(file, name, { name, type: fieldType, attrs });
                    }
                }
            }
                data-testid="file-field-input"
            />
        </Box>
    );
};

export default FileField;