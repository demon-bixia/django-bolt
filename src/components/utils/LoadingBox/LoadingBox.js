import {styled} from "@mui/system";
import Box from "@mui/material/Box";

const LoadingBox = styled(Box)(({ theme }) => ({
    background: `linear-gradient(170deg, ${theme.palette.grey[200]} 0%, ${theme.palette.border} 90% ) `,
    borderRadius: '12px',

    animation: 'loading-animation 1s infinite ease',
    backgroundSize: '200% 100%',

    '@keyframes loading-animation': {
        '0%': {
            backgroundPosition: '200% 0',
        },
        '100%': {
            backgroundPosition: '0 0',
        }
    }
}));

export default LoadingBox;