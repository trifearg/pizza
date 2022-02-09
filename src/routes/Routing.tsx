import { FunctionComponent } from "react";
import AccountPage from '../components/AccountPage/AccountPage';
import LoginPage from '../components/LoginPage/LoginPage';
import HomePage from '../components/HomePage/HomePage';
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