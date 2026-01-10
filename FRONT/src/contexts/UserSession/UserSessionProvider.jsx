import userSessionReducerActions from '@/contexts/UserSession/state/actions.js';
import INITIAL_USER_SESSION_STATE from '@/contexts/UserSession/state/initialState.js';
import userSessionReducer from '@/contexts/UserSession/state/reducer.js';
import UserSessionContext from '@/contexts/UserSession/UserSessionContext.js';
import { useReducer } from 'react';

const UserSessionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    userSessionReducer,
    INITIAL_USER_SESSION_STATE
  );

  const actions = userSessionReducerActions(dispatch);

  return (
    <UserSessionContext value={{ state, actions }}>
      {children}
    </UserSessionContext>
  );
};

export default UserSessionProvider;
