const userSessionContextActions = (dispatch) => ({
  login: ({ accessToken, userId, userName, nickName, img }) =>
    dispatch({
      type: 'LOGIN',
      payload: { accessToken, userId, userName, nickName, img }
    }),
  logout: () => dispatch({ type: 'LOGOUT' }),

  setAccessToken: (value) =>
    dispatch({
      type: 'SET_PRIMITIVE_FIELD',
      payload: { key: 'accessToken', value }
    }),
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
    }),
  setImg: (value) =>
    dispatch({
      type: 'SET_PRIMITIVE_FIELD',
      payload: { key: 'img', value }
    })
});

export default userSessionContextActions;
