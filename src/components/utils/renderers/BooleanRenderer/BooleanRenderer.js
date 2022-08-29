import Box from "@mui/material/Box";
import { styled, useTheme } from "@mui/system";
import FeatherIcon from "feather-icons-react";

const BooleanDisplayWrap = styled(Box)(({ theme, value }) => ({
    backgroundColor: value ? theme.palette.success.tint : theme.palette.error.tint,
    borderRadius: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: '1px',
    width: '16px',
    height: '16px',
    alignItems: 'center',
    '.feather': {
        color: theme.palette.grey[100],
        stokeWidth: '1.5px',
    }
}))

const BooleanDisplayIcon = ({ value }) => {
    const theme = useTheme();
    return (

        <BooleanDisplayWrap value={value}>
            <FeatherIcon icon={value ? 'check' : 'x'} size={16} />
        </BooleanDisplayWrap >
    )
};

const BooleanRenderer = (params) => {
    return (<BooleanDisplayIcon value={params.value} />);
};


export default BooleanRenderer;