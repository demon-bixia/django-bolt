import {ThemeProvider} from '@mui/material/styles';
import {overrides} from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
import {Route, Routes} from "react-router-dom";
import AuthRoutes from "./components/utils/AuthRoutes";
import LoginPage from "./components/pages/LoginPage";
import ProtectedRoutes from "./components/utils/ProtectedRoutes";
import IndexPage from "./components/pages/IndexPage/IndexPage";
import HomePage from "./components/pages/HomePage/HomePage";

import {AuthProvider} from "./components/contexts/AuthContext";
import TestForm from "./components/TestForm";


const App = () => {

    return (<div className="App">
        <ThemeProvider theme={overrides}>
            <CssBaseline/>
            <AuthProvider>
                <Routes>
                    <Route element={<AuthRoutes/>}>
                        <Route path="/login" element={<LoginPage/>}/>
                    </Route>
                    <Route element={<ProtectedRoutes/>}>
                        <Route path="/" element={<IndexPage/>}>
                            <Route path='/' element={<HomePage/>}/>
                            <Route path="/test" element={<TestForm/>}/>
                        </Route>
                    </Route>
                </Routes>
            </AuthProvider>
        </ThemeProvider>
    </div>);
};

export default App;


