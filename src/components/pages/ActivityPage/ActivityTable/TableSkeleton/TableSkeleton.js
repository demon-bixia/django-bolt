import Box from "@mui/material/Box";
import { useTheme } from "@mui/system";
import LoadingBox from "../../../../utils/LoadingBox";

const TableSkeleton = () => {
    const theme = useTheme();

    return (
        <Box sx={{ width: '100%', height: { xs: '600px', md: '80vh' }, borderRadius: '12px', padding: theme.spacing(5), background: theme.palette.background.paper, display: 'flex', flexDirection: 'column', boxShadow: theme.shadows[0] }} >
            {/* table toolbar */}
            < Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: theme.spacing(6) }}>
                <Box sx={{ flexGrow: '1' }}>
                    <LoadingBox sx={{ width: '90px', height: '20px', display: { 'xs': 'none', 'md': 'block' } }} />
                </Box>
            </Box>

            {/* table main */}
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', width: '100%' }}>
                {[1, 2, 3, 4, 5, 7, 8, 9].map((item, index) => (
                    <Box sx={{ marginBottom: theme.spacing(7), width: '100%' }} key={index}>
                        <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', width: '100%' }}>
                            <Box sx={{ flexBasis: { xs: '100%', md: '100%' }, height: '20px', marginRight: '8px', }}>
                                <LoadingBox sx={{ width: '100%', height: '100%' }} />
                            </Box>
                            <Box sx={{ flexBasis: { xs: '100%', md: '100%' }, height: '20px', marginRight: '8px', display: { xs: 'none', md: 'block' } }}>
                                <LoadingBox sx={{ width: '100%', height: '100%' }} />
                            </Box>
                            <Box sx={{ flexBasis: { xs: '100%', md: '100%' }, height: '20px', marginRight: '8px', display: { xs: 'none', md: 'block' } }}>
                                <LoadingBox sx={{ width: '100%', height: '100%' }} />
                            </Box>
                            <Box sx={{ flexBasis: { xs: '100%', md: '100%' }, height: '20px', marginRight: '8px', display: { xs: 'none', md: 'block' } }}>
                                <LoadingBox sx={{ width: '100%', height: '100%' }} />
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>

            {/* table footer */}
            <Box sx={{ display: 'flex', marginBottom: theme.spacing(5), }}>
                <Box sx={{ flexGrow: 1 }} />
                <LoadingBox sx={{ width: '250px', height: '20px', }} />
            </Box>
        </Box >
    );
};

export default TableSkeleton;