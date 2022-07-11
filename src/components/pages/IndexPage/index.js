import IndexPage from "./IndexPage";

import indexPageReducer, {
    fetchActionList,
    fetchAppList,
    selectStatus,
    selectAllActions,
    selectAllApps,
    indexPageSlice
} from "./indexPageSlice";

export {fetchActionList, fetchAppList, selectStatus, selectAllActions, selectAllApps, indexPageReducer, indexPageSlice};

export default IndexPage;