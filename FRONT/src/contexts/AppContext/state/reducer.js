const appReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_THEME': {
      localStorage.setItem('theme', payload);
      document.documentElement.setAttribute('data-theme', payload);
      return { ...state, theme: payload };
    }

    case 'SET_LANGUAGE': {
      localStorage.setItem('language', payload);
      return { ...state, language: payload };
    }

    default:
      return state;
  }
};

export default appReducer;
