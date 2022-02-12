import { FunctionComponent } from "react";
import { Navigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Connector, PropsFromRedux } from "../../store/connector/Connector";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const AccountPage: FunctionComponent = Connector((props: PropsFromRedux) => {
    const { currentUserIsLogin } = props;
    const location = useLocation();

    if (!currentUserIsLogin) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return (
        <Container>
            <h1>My account</h1>
        </Container>
    );
})

export default AccountPage;