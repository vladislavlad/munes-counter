import './App.css'
import { Route, Routes } from "react-router-dom";
import MainPage from "./compoments/MainPage";
import Login from "./compoments/Login";
import NotFound from "./compoments/NotFound";
import Layout from "./compoments/Layout";

function App() {

    return (
        <Routes>
            <Route path="/" element={ <Layout/> }>
                {/* public routes */ }

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