import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";

const ToolbarWrap = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(0, 0, 6, 0)
}));

const TableToolbar = (props) => {
    const [anchorElement, setAnchorElement] = useState(null);
    const open = Boolean(anchorElement);

    const handleToggleMenu = event => { setAnchorElement(event.currentTarget) };
    const handleClose = () => { setAnchorElement(null); };

    return (
        <>
            <ToolbarWrap>
                <Typography variant="h5">History</Typography>
            </ToolbarWrap>
        </>
    );
};

export default TableToolbar;