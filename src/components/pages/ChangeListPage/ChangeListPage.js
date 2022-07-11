import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import ChangeListHeader from './ChangeListHeader';
import ChangeListTable from "./ChangeListTable";

const Layout = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(7)
}));


const ChangeListPage = () => {

    return (
        <Layout>
            <ChangeListHeader />
            <ChangeListTable />
        </Layout>
    )
};


export default ChangeListPage;
