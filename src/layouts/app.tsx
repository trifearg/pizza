import { FunctionComponent } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../components/LoginPage/LoginPage';

const App: FunctionComponent = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </>
  );
};

export default App;
