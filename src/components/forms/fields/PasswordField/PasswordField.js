import { useState } from "react";
import { InputAdornment, IconButton } from "@mui/material";
import FeatherIcon from "feather-icons-react";
import CharField from "../CharField";

const PasswordField = (props) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPasswordChange = () => {
        setShowPassword(!showPassword);
    };

    return (
        <CharField
            {...props}
            type={showPassword ? "text" : "password"}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="start">
                        <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                            onClick={handleShowPasswordChange}
                            data-testid="password-field-switch-input-type"
                        >
                            <FeatherIcon icon={showPassword ? "eye" : "eye-off"} size={20} />
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    );
};

export default PasswordField;
