import {ThemeProvider} from '@mui/material/styles';
import {overrides} from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";

function App() {

    return (
        <div className="App">
            <ThemeProvider theme={overrides}>
                <CssBaseline/>
                <BrowserRouter>
                    <Routes>
                        <Route path="login" element={<LoginPage/>}/>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
}

export default App;
