import FeatherIcon from "feather-icons-react";
import {styled} from '@mui/system';
import TextField from '@mui/material/TextField';
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import {useRef} from "react";

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

    return (
        <FileUploadField
            {...props}
            label={attrs['label'] || ''}
            error={!!errors}
            value={fieldInputValue || 'No File Chosen'}
            helperText={errors ? errors.join('.\n') : attrs['help_text'] || ''}
            inputProps={inputProps}
            onClick={event => {
                fileInputRef.current.click();
                return onClick(event, props.name);
            }}

            InputProps={{
                endAdornment: (
                    <InputAdornment position="start">
                        <IconButton
                            aria-label="toggle password visibility"
                            disabled
                            edge="end">
                            <FeatherIcon icon={type === "ImageField" ? "image" : "file"} size={20}/>
                            <input ref={fileInputRef} type="file" hidden onChange={event => {
                                if (!event.target.files)
                                    return;
                                return onChange({'file': event.target.files[0]}, props.name, 'fileUpload')
                            }}/>
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    );
};

export default FileField;