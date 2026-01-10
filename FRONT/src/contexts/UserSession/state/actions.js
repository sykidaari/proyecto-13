const userSessionReducerActions = (dispatch) => ({
  login: ({ accessToken, userId, userName, nickName }) =>
    dispatch({
      type: 'LOGIN',
      payload: { accessToken, userId, userName, nickName }
    }),
  logout: () => dispatch({ type: 'LOGOUT' }),

  setUserId: (value) =>
    dispatch({
      type: 'SET_PRIMITIVE_FIELD',
      payload: { key: 'userId', value }
    }),
  setUserName: (value) =>
    dispatch({
      type: 'SET_PRIMITIVE_FIELD',
      payload: { key: 'userName', value }
    }),
  setNickName: (value) =>
    dispatch({
      type: 'SET_PRIMITIVE_FIELD',
      payload: { key: 'nickName', value }
    })
});

export default userSessionReducerActions;
