import INITIAL_USER_SESSION_STATE from '@/contexts/UserSession/state/initialState.js';
import { IS_DEV } from '@/utils/env.js';

const requiredLoginKeys = Object.keys(INITIAL_USER_SESSION_STATE).filter(
  (key) => key !== 'isLoggedIn'
);

const userSessionReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'LOGIN': {
      if (state.isLoggedIn) {
        if (IS_DEV)
          console.warn('already logged in with following userSession:', state);
        return state;
      }

      for (const key of requiredLoginKeys) {
        if (!(key in payload)) {
          if (IS_DEV)
            console.warn(`LOGIN payload missing required key: "${key}"`);
          return state;
        }
      }

      return {
        ...state,
        isLoggedIn: true,
        accessToken: payload.accessToken,
        userId: payload.userId,
        userName: payload.userName,
        nickName: payload.nickName
      };
    }

    case 'LOGOUT': {
      if (!state.isLoggedIn) {
        if (IS_DEV) console.warn('no user currently logged in');
        return state;
      }
      return { ...INITIAL_USER_SESSION_STATE };
    }

    case 'SET_PRIMITIVE_FIELD': {
      const { key, value } = payload;

      if (!(key in INITIAL_USER_SESSION_STATE)) {
        if (IS_DEV) console.warn('invalid key');
        return state;
      }

      if (key === 'isLoggedIn') {
        if (IS_DEV)
          console.warn('Use case LOGIN or LOGOUT to modify isLoggedIn');
        return state;
      }

      return { ...state, [key]: value };
    }

    default:
      return state;
  }
};

export default userSessionReducer;
