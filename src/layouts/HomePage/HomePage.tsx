import { FunctionComponent, useEffect } from "react";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";
import PizzaList from "../../components/PizzaList/PizzaList";
import { Connector, PropsFromRedux } from "../../store/connector/Connector";

const styledSpinner = {
    position: "fixed",
    top: "50%",
    left: "50%"
}

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 0 30px;
    width: 1280px;
    margin: 0 auto;
    box-sizing: border-box;
    justify-content: center;
    align-items: center
`

const HomePage: FunctionComponent = Connector((props: PropsFromRedux) => {
    const { pizza, fetchPizza, fetchingPizza } = props;

    useEffect(() => {
        fetchPizza();
    }, []);

    if (fetchingPizza) {
        return <CircularProgress color="warning" sx={styledSpinner} />
    }

    return (
        <Container>
            <PizzaList pizza={pizza} />
        </Container>
    );
})

export default HomePage;