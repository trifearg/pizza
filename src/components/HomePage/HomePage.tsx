import { FunctionComponent } from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const HomePage: FunctionComponent = () => {
    return (
        <Container>
            <h1>Home</h1>
        </Container>
    );
}

export default HomePage;