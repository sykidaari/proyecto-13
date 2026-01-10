const appReducerActions = (dispatch) => ({
  setAppTheme: () => dispatch({ type: 'TOGGLE_THEME' }),
  setLanguage: (value) => dispatch({ type: 'SET_LANGUAGE', payload: value }),
  setCountry: (value) => dispatch({ type: 'SET_COUNTRY', payload: value }),
  setSaveMode: (value) => dispatch({ type: 'SET_SAVE_MODE', payload: value })
});

export default appReducerActions;
