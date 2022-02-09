import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { RootState } from "../../store";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const AccountPage: FunctionComponent = () => {
    const user = useSelector((state: RootState) => state.currentUser);
    const location = useLocation();

    if (!user.isLogin) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return (
        <Container>
            <h1>My account</h1>
        </Container>
    );
}

export default AccountPage;