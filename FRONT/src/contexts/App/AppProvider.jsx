import LSI from '@/constants/client/localStorageItems.js';
import AppContext from '@/contexts/App/AppContext.js';
import appContextActions from '@/contexts/App/state/actions.js';
import getInitialAppState from '@/contexts/App/state/getInitialAppState.js';
import INITIAL_APP_STATE from '@/contexts/App/state/initialState.js';
import appReducer from '@/contexts/App/state/reducer.js';
import syncAppStateFromBackend from '@/contexts/App/utils/syncAppStateFromBackend.js';
import useUserSessionContext from '@/contexts/UserSession/hooks/useUserSessionContext.js';
import useEffectIgnoreDeps from '@/hooks/useEffectIgnoreDeps.js';
import { useReducer } from 'react';

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    appReducer,
    INITIAL_APP_STATE,
    getInitialAppState
  );

  const { theme, language, saveMode } = state;

  const saveOnDevice = saveMode === 'thisDevice';

  useEffectIgnoreDeps(() => {
    document.documentElement.setAttribute('data-theme', theme);

    if (saveOnDevice) localStorage.setItem(LSI.theme, theme);
  }, [theme]);

  useEffectIgnoreDeps(() => {
    if (saveOnDevice) localStorage.setItem(LSI.language, language);
  }, [language]);

  useEffectIgnoreDeps(() => {
    if (!saveOnDevice) {
      localStorage.removeItem(LSI.theme);
      localStorage.removeItem(LSI.language);
    }
  }, [saveMode]);

  const actions = appContextActions(dispatch);

  const {
    initialUserData,
    state: { accessToken }
  } = useUserSessionContext();

  useEffectIgnoreDeps(() => {
    if (!initialUserData || !accessToken) return;
    syncAppStateFromBackend(initialUserData, actions, state);
  }, [initialUserData, accessToken]);

  return <AppContext value={{ state, actions }}>{children}</AppContext>;
};

export default AppProvider;
