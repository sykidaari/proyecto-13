const userSessionReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'LOGIN': {
      if (state.isLoggedIn === true) {
        if (import.meta.env.DEV)
          console.warn('already logged in with following userSession:', state);
        return state;
      }
      return { ...state, isLoggedIn: true };
    }

    case 'SET_PRIMITIVE_FIELD': {
      return { ...state, theme: payload };
    }

    default:
      return state;
  }
};

const reducer = (stateKey) => ({ ...state, [stateKey]: stateKey });

export default userSessionReducer;
