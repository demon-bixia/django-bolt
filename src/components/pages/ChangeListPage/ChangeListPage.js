import { useTheme } from '@emotion/react';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { selectModelByName } from "../IndexPage";
import ChangeListHeader from './ChangeListHeader';
import ChangeListTable, { resetChangeList } from "./ChangeListTable";

const ChangeListPage = () => {
    const { appLabel, modelName } = useParams();
    const model = useSelector(state => selectModelByName(state, appLabel, modelName));
    const theme = useTheme();
    const dispatch = useDispatch();

    // when the changelist page unmounts
    // set the changelist table status to empty
    useEffect(() => {
        return () => {
            dispatch(resetChangeList());
        };
    }, []);

    return (
        <Box sx={{ marginBottom: theme.spacing(7), }}>
            <ChangeListHeader
                model={model}
            />
            <ChangeListTable
                model={model}
            />
        </Box>
    );
};

export default ChangeListPage;
