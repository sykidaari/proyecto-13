const requestContext = {
  // from userSessionContext
  accessToken: null
};

export const updateRequestContext = (updateFields) =>
  Object.assign(requestContext, updateFields);

export default requestContext;
