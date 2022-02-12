import { FunctionComponent} from "react";
import AccountPage from '../layouts/AccountPage/AccountPage';
import LoginPage from '../layouts/LoginPage/LoginPage';
import HomePage from '../layouts/HomePage/HomePage';
import { Routes, Route } from "react-router-dom";


const Routing: FunctionComponent = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/account" element={<AccountPage />} /> 
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    )
}

export default Routing;