import CircularProgress from '@mui/material/CircularProgress';
import Box from "@mui/material/Box";

const LoadingOverlay = () => {
    return (
        <Box sx={{ width: "100%", height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress variant="indeterminate" />
        </Box>
    );
};

export default LoadingOverlay;