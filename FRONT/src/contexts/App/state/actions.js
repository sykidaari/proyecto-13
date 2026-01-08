const reducerActions = (dispatch) => ({
  setAppTheme: () => dispatch({ type: 'TOGGLE_THEME' }),
  setLanguage: (payload) => dispatch({ type: 'SET_LANGUAGE', payload }),
  setCountry: (payload) => dispatch({ type: 'SET_COUNTRY', payload }),
  setSaveMode: (payload) => dispatch({ type: 'SET_SAVE_MODE', payload })
});

export default reducerActions;
