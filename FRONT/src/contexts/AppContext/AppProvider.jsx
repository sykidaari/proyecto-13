import AppContext from '@/contexts/AppContext/AppContext.js';
import reducerActions from '@/contexts/AppContext/state/actions.js';
import getInitialAppState from '@/contexts/AppContext/state/getInitialAppState.js';
import INITIAL_APP_STATE from '@/contexts/AppContext/state/initialState.js';
import appReducer from '@/contexts/AppContext/state/reducer.js';
import { useEffect, useMemo, useReducer } from 'react';

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    appReducer,
    INITIAL_APP_STATE,
    getInitialAppState
  );

  const { theme } = state;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const actions = useMemo(() => reducerActions(dispatch), [dispatch]);

  return <AppContext value={{ state, actions }}>{children}</AppContext>;
};

export default AppProvider;
