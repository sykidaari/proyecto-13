const reducerActions = (dispatch) => ({
  setAppTheme: (value) =>
    dispatch({
      type: 'SET_THEME',
      payload: value ? 'dark' : 'light'
    }),

  setLanguage: (value) => dispatch({ type: 'SET_LANGUAGE', payload: value })
});

export default reducerActions;
