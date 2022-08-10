import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authProviderReducer from "../components/authentication/AuthProvider/authProviderSlice";
import changeListReducer from "../components/pages/ChangeListPage/ChangeListTable/changeListSlice";
import indexPageReducer from "../components/pages/IndexPage/indexPageSlice";

const rootReducer = combineReducers({
    auth: authProviderReducer,
    index: indexPageReducer,
    changelist: changeListReducer,
});

export const setupStore = preloadedState => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false,
        }),
    })
};

export default setupStore({});