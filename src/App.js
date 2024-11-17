import './App.css'
import { Route, Routes } from "react-router-dom";
import MainPage from "./compoments/MainPage";
import Login from "./compoments/platform/Login";
import NotFound from "./compoments/platform/NotFound";
import Layout from "./compoments/platform/Layout";

function App() {

    return (
        <Routes>
            <Route path="/" element={ <Layout/> }>

                <Route path="/login" element={ <Login/> }/>
                {/*<Route path="register" element={<Register />} />*/ }

                <Route path="/" element={ <MainPage/> }/>

                {/*<Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>*/ }
                {/*    <Route path="admin" element={<Admin />} />*/ }
                {/*</Route>*/ }

                <Route path="*" element={ <NotFound/> }/>
            </Route>
        </Routes>
    );
}

export default App;