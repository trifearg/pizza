import { FunctionComponent, lazy, Suspense } from 'react';
import AccountPage from '../layouts/AccountPage/AccountPage';
import LoginPage from '../layouts/LoginPage/LoginPage';
import { Routes, Route } from 'react-router-dom';

const HomePage = lazy(() => import('../layouts/HomePage/HomePage'));

const Routing: FunctionComponent = () => {

    return (
        <Suspense fallback={<div></div>}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </Suspense>
    );
};

export default Routing;
