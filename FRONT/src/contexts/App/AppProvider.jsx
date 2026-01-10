import AppContext from '@/contexts/App/AppContext.js';
import appReducerActions from '@/contexts/App/state/actions.js';
import getInitialAppState from '@/contexts/App/state/getInitialAppState.js';
import INITIAL_APP_STATE from '@/contexts/App/state/initialState.js';
import appReducer from '@/contexts/App/state/reducer.js';
import { useEffect, useReducer } from 'react';

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    appReducer,
    INITIAL_APP_STATE,
    getInitialAppState
  );

  const { theme, language, saveMode } = state;

  const saveOnDevice = saveMode === 'thisDevice';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);

    if (saveOnDevice) localStorage.setItem('theme', theme);
    // eslint-disable-next-line  react-hooks/exhaustive-deps
  }, [theme]);

  useEffect(() => {
    if (saveOnDevice) localStorage.setItem('language', language);
    // eslint-disable-next-line  react-hooks/exhaustive-deps
  }, [language]);

  useEffect(() => {
    if (!saveOnDevice) {
      localStorage.removeItem('theme');
      localStorage.removeItem('language');
    }
    // eslint-disable-next-line  react-hooks/exhaustive-deps
  }, [saveMode]);

  const actions = appReducerActions(dispatch);

  return <AppContext value={{ state, actions }}>{children}</AppContext>;
};

export default AppProvider;

//* Using eslint-disable-next-line as saveOnDevice is not wanted as dep in effects
