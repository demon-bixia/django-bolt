import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ActivityHeader from "./ActivityHeader";
import { resetActivityState } from "./activityPageSlice";
import ActivityTable from "./ActivityTable";

const ActivityPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(resetActivityState());
        };
    }, []);

    return (
        <Box>
            <ActivityHeader />
            <ActivityTable />
        </Box>
    )
};

export default ActivityPage;