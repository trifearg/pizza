import React, { FunctionComponent, useCallback, useEffect } from 'react';
import { connect, InferableComponentEnhancerWithProps } from 'react-redux';
import './app.css';
import { getFetchingUsers, getFetchingUsersError, getUsers, Thunks as usersThunks} from '../store/users'
import { DispatchThunk, RootState } from '../store';
import { defaultUsers, UserModel } from '../api/models';

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
  const { users, fetchingUsers, fetchUsers, updateUsers } = props;

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    console.log(users);
  }, [fetchingUsers]);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a onClick={() => updateUsers(defaultUsers.slice(0, 3))}>
          Update Users
        </a>
      </header>
    </div>
  );
});

export default App;
