import Box from "@mui/material/Box";
import { styled, useTheme } from "@mui/system";

const LoadingBox = styled(Box)(({ theme }) => ({
    background: `linear-gradient(170deg, ${theme.palette.grey[200]} 0%, ${theme.palette.border} 90% ) `,


    borderRadius: '12px',
    animation: 'loading-animation 1s infinite ease',

    '@keyframes loading-animation': {
        '0%': {
            backgroundPosition: `-400px 0`,
        },
        '100%': {
            backgroundPosition: `0 0`,
        }
    }
}));

// fix animation and mobile view
const TableLoadingSkeleton = () => {
    const theme = useTheme();

    return (
        <Box sx={{ width: '100%', height: '100%', borderRadius: '12px', padding: theme.spacing(5), background: theme.palette.background.paper, display: 'flex', flexDirection: 'column' }}>
            {/* table toolbar */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: theme.spacing(6) }}>
                <Box sx={{ flexGrow: '1' }}>
                    <LoadingBox sx={{ width: '90px', height: '20px', display: { 'xs': 'none', 'md': 'block' } }} />
                </Box>

                <LoadingBox sx={{ width: { xs: '100%', md: '233px' }, height: '49px', marginRight: '8px' }} />
                <LoadingBox sx={{ width: '49px', height: '49px' }} />
            </Box>

            {/* table main */}
            <Box sx={{ flexGrow: '1', display: 'flex', flexDirection: 'column', justifyContent: 'start', marginBottom: theme.spacing(5) }}>

                {[1, 2, 3, 4, 5, 7, 8, 9].map((item, index) => (
                    <Box sx={{ marginBottom: theme.spacing(7) }} key={index}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <LoadingBox sx={{ width: '20px', height: '20px', borderRadius: '100%', marginRight: '8px' }} />
                            <LoadingBox sx={{ width: { xs: '99%', md: '20%' }, height: '20px', marginRight: '8px', }} />
                            <LoadingBox sx={{ width: '20%', height: '20px', marginRight: '8px', display: { xs: 'none', md: 'block' } }} />
                            <LoadingBox sx={{ width: '20%', height: '20px', marginRight: '8px', display: { xs: 'none', md: 'block' } }} />
                            <LoadingBox sx={{ width: '20%', height: '20px', marginRight: '8px', display: { xs: 'none', md: 'block' } }} />
                            <LoadingBox sx={{ width: '20%', height: '20px', display: { xs: 'none', md: 'block' } }} />
                        </Box>
                    </Box>
                ))}
            </Box>

            {/* table footer */}
            <Box sx={{ display: 'flex', }}>
                <Box sx={{ flexGrow: 1 }} />
                <LoadingBox sx={{ width: '250px', height: '20px', }} />
            </Box>
        </Box>
    );
};


export default TableLoadingSkeleton;
