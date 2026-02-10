import backend, { injectUserSessionActions } from '@/api/config/axios.js';
import { updateRequestContext } from '@/api/config/requestContext.js';
import userSessionContextActions from '@/contexts/UserSession/state/actions.js';
import INITIAL_USER_SESSION_STATE from '@/contexts/UserSession/state/initialState.js';
import userSessionReducer from '@/contexts/UserSession/state/reducer.js';
import UserSessionContext from '@/contexts/UserSession/UserSessionContext.js';
import useEffectIgnoreDeps from '@/hooks/useEffectIgnoreDeps.js';
import { IS_DEV } from '@/utils/env.js';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useReducer, useState } from 'react';

const UserSessionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    userSessionReducer,
    INITIAL_USER_SESSION_STATE
  );

  const actions = userSessionContextActions(dispatch);
  useEffect(() => {
    injectUserSessionActions(actions);
  }, [actions]);

  const [initializing, setInitializing] = useState(true);
  const [initialUserData, setInitialUserData] = useState(null);

  useEffectIgnoreDeps(() => {
    const tryRefresh = async () => {
      try {
        const { data: refreshData } = await backend.post('/userAccessSession');
        const accessToken = refreshData.accessToken;

        updateRequestContext({ accessToken });
        const { userId } = jwtDecode(accessToken);
        const { data: userData } = await backend.get(`/user/${userId}`);

        actions.login({
          accessToken,
          userId,
          userName: userData.userName,
          nickName: userData.nickName,
          img: userData.img,
          emailAddress: userData.emailAddress
        });

        setInitialUserData(userData);
      } catch (error) {
        if (!IS_DEV) return;

        if (error.response?.status === 401)
          console.log('DEV: Ignoring 401 errors caused by React Strict Mode');
        else console.error('DEV: Session initialization failed:', error);
      } finally {
        setInitializing(false);
      }
    };

    tryRefresh();
  }, []);

  return (
    <UserSessionContext
      value={{ state, actions, initializing, initialUserData: initialUserData }}
    >
      {children}
    </UserSessionContext>
  );
};

export default UserSessionProvider;
