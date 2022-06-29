import FeatherIcon from "feather-icons-react";
import {styled, useTheme} from '@mui/system';
import TextField from '@mui/material/TextField';
import {useRef} from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const FileUploadField = styled(TextField)(({theme}) => ({
    margin: `0 0 10px 0`,
    cursor: "pointer",
    ".MuiInputBase-adornedEnd": {
        cursor: "pointer",
    },

    ".MuiInputBase-inputAdornedEnd": {
        cursor: "pointer",
    }
}));

const FileField = ({field: {attrs, type}, errors, value, fieldInputValue, inputProps, onChange, onClick, ...props}) => {
    const fileInputRef = useRef(null);
    const theme = useTheme();

    const openFileInput = (event) => {
        fileInputRef.current.click();
        return onClick(event, props.name); // for removing errors when clicking
    };

    return (
        <Box sx={{display: 'flex'}}>
            <FileUploadField
                sx={{marginRight: theme.spacing(2)}}
                {...props}
                label={attrs['label'] || ''}
                error={!!errors}
                value={fieldInputValue || 'No file chosen'}
                helperText={errors ? errors.join('.\n') : attrs['help_text'] || ''}
                inputProps={inputProps}
                onClick={openFileInput}
            />
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
                <FeatherIcon icon="upload" size={20}/>
            </Button>

            <input ref={fileInputRef} type="file" hidden onChange={event => {
                if (!event.target.files)
                    return;
                return onChange({'file': event.target.files[0]}, props.name, 'fileUpload') // changing the state
            }}/>
        </Box>
    );
};

export default FileField;