import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authProviderReducer from "../components/authentication/AuthProvider/authProviderSlice";
import changeListReducer from "../components/pages/ChangeListPage/ChangeListTable/changeListSlice";
import indexPageReducer from "../components/pages/IndexPage/indexPageSlice";
import FormPageReducer from '../components/pages/FormPage/formPageSlice';
import ActivityReducer from "../components/pages/ActivityPage/activityPageSlice";

const rootReducer = combineReducers({
    auth: authProviderReducer,
    index: indexPageReducer,
    changelist: changeListReducer,
    form: FormPageReducer,
    activity: ActivityReducer,
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