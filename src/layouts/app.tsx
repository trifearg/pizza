import { FunctionComponent, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { createGlobalStyle } from 'styled-components';
import Routing from '../routes/Routing';
import { Connector, PropsFromRedux } from '../store/connector/Connector';

const AppStyled = createGlobalStyle`
  body {
    display: flex;
    flex-direction: column;
    min-height: 100%
  }
`

const App: FunctionComponent = Connector((props: PropsFromRedux) => {
  const { fetchUsers } = props;

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <AppStyled />
      <Navbar />
      <Routing />
    </>
  );
});

export default App;
