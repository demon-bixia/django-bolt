import {configureStore} from "@reduxjs/toolkit";
import {authProviderReducer} from "../components/AuthProvider";
import {indexPageReducer} from "../components/pages/IndexPage";

export default configureStore({
    reducer: {
        auth: authProviderReducer,
        index: indexPageReducer,
    }
});
