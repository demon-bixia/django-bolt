import AuthProvider from "./AuthProvider";
import authProviderReducer, {
    fetchUser,
    fetchCsrfToken,
    setUser,
    selectUser,
    removeUser,
    selectCsrfToken,
    selectStatus,
    authProviderSlice
} from './authProviderSlice'

export {
    authProviderReducer,
    fetchUser,
    fetchCsrfToken,
    setUser,
    selectUser,
    removeUser,
    selectCsrfToken,
    selectStatus,
    authProviderSlice,

};
export default AuthProvider