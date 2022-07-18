import { configureStore } from "@reduxjs/toolkit";
import { authProviderReducer } from "../components/AuthProvider";
import { indexPageReducer } from "../components/pages/IndexPage";
import { changeListReducer } from "../components/pages/ChangeListPage/ChangeListTable";


export default configureStore({
    reducer: {
        auth: authProviderReducer,
        index: indexPageReducer,
        changelist: changeListReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
});
