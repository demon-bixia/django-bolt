import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/system";

const ErrorMessage = ({ code = '', message = '', title = '', action = '', to = '', onClick = () => { } }) => {
    const theme = useTheme();

    return (
        <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ width: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', }}>
                <Typography variant='h1' sx={{ marginBottom: theme.spacing(2) }}>{code}</Typography>
                <Typography variant='h1' sx={{ marginBottom: theme.spacing(2) }}>{title}</Typography>
                <Typography variant="body2" sx={{ marginBottom: theme.spacing(6) }}>
                    {message}
                </Typography>

                <Button
                    onClick={onClick}
                    variant="outlined"
                    sx={{
                        width: '250px',
                        height: '49px',
                        //background: theme.palette.primaryGradient.main,
                    }}
                >
                    {action}
                </Button>
            </Box>
        </Box>
    );
};

export default ErrorMessage;