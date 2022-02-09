import { FunctionComponent, useEffect } from 'react';
import { connect, InferableComponentEnhancerWithProps } from 'react-redux';
import { getFetchingUsers, getFetchingUsersError, getUsers, Thunks as usersThunks } from '../store/users'
import { DispatchThunk, RootState } from '../store';
import { UserModel } from '../api/models';
import Navbar from '../components/Navbar/Navbar';
import { createGlobalStyle } from 'styled-components';
import Routing from '../routes/Routing';

const AppStyled = createGlobalStyle`
  body {
    display: flex;
    flex-direction: column;
    min-height: 100%
  }
`

const Connector = connect(
  (state: RootState) => ({
    users: getUsers(state),
    fetchingUsers: getFetchingUsers(state),
    fetchingUsersError: getFetchingUsersError(state),
  }),
  (dispatch: DispatchThunk) => ({
    fetchUsers: () => {
      dispatch(usersThunks.onFetchUsers());
    },
    updateUsers: (users: UserModel[]) => {
      dispatch(usersThunks.onUpdateUsers(users));
    },
  })
);

type GetProps<C> = C extends InferableComponentEnhancerWithProps<infer P, {}> ? P : never;
type PropsFromRedux = GetProps<typeof Connector>;

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
