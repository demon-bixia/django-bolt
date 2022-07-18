import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from '@mui/material/styles';
import { overrides } from "./application/theme";

import { Route, Routes } from "react-router-dom";
import AuthRoutes from "./components/utils/routes/AuthRoutes";
import ProtectedRoutes from "./components/utils/routes/ProtectedRoutes";

import HomePage from "./components/pages/HomePage";
import IndexPage from "./components/pages/IndexPage";
import LoginPage from "./components/pages/LoginPage";

import { TestForm } from "./components/DynamicForm";

import AuthProvider from "./components/AuthProvider";
import ChangeListPage from './components/pages/ChangeListPage';

// Core features:
// round 1
// todo create the change list page.
// todo create the admin activity/history page.

// round 2
// todo test dynamic forms with testing library
// todo create the add/change pages.


// Optimizations:
// round 3
// todo optimize error handling (e.g no connection, page not found, server error).
// todo optimize for customization from server and theme overriding.
// todo optimize accessibility.

// Future features:
// todo (future) add dashboard and widgets support (e.g charts, lists, bookmarks).

const App = () => {

    return (<div className="App">
        <ThemeProvider theme={overrides}>
            <CssBaseline />
            <AuthProvider>
                <Routes>
                    <Route element={<AuthRoutes />}>
                        <Route path="/login" element={<LoginPage />} />
                    </Route>

                    <Route element={<ProtectedRoutes />}>
                        <Route path="/" element={<IndexPage />}>
                            <Route path='/' element={<HomePage />} />
                            <Route path='/:appLabel/:modelName/changelist/' element={<ChangeListPage />} />
                            <Route path="/test" element={<TestForm />} />
                        </Route>
                    </Route>
                </Routes>
            </AuthProvider>
        </ThemeProvider>
    </div>);
};

export default App;


