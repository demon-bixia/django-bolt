import LoadingBox from "../../../../utils/LoadingBox";
import { styled, useTheme } from "@mui/system";
import { Box, Paper } from "@mui/material";
import { Group, Section } from "../Form";

export const FormBackground = styled(Paper)(({ theme }) => ({
    width: '100%', padding: theme.spacing(5), borderRadius: '12px', marginBottom: theme.spacing(6),
}));

const FormSkeleton = () => {
    const theme = useTheme()
    return (
        <FormBackground elevation={0}>
            <LoadingBox sx={{
                width: '90px',
                height: '20px',
                display: { 'xs': 'none', 'md': 'block' },
                marginBottom: theme.spacing(7)
            }} />

            <Section>

                <LoadingBox
                    sx={{
                        width: '100%',
                        height: '39px',
                        marginRight: theme.spacing(4),
                        marginBottom: theme.spacing(5)
                    }}
                />

                <LoadingBox
                    sx={{
                        width: '100%',
                        height: '39px',
                        marginRight: theme.spacing(4),
                        marginBottom: theme.spacing(5)
                    }}
                />

                <LoadingBox
                    sx={{
                        width: '100%',
                        height: '39px',
                        marginRight: theme.spacing(4),
                        marginBottom: theme.spacing(5)
                    }}
                />

                <LoadingBox
                    sx={{
                        width: '100%',
                        height: '39px',
                        marginRight: theme.spacing(4),
                        marginBottom: theme.spacing(5)
                    }}
                />

                <LoadingBox sx={{ width: '100%', height: '39px', marginRight: theme.spacing(4) }} />
            </Section>
        </FormBackground>
    );
};

export default FormSkeleton;