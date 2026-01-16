import requestContext, {
  updateRequestContext
} from '@/api/config/requestContext.js';
import { BACKEND_BASE_URL } from '@/utils/env.js';
import axios from 'axios';

const backend = axios.create({
  baseURL: BACKEND_BASE_URL,
  withCredentials: true,
  timeout: 8000
});

export default backend;

// HELPER TO GET ACTIONS FROM USERSESSIONCONTEXT
let userSessionActionsRef = null;
export const injectUserSessionActions = (actions) => {
  userSessionActionsRef = actions;
};

// TO INCLUDE TOKEN
backend.interceptors.request.use((config) => {
  const { accessToken } = requestContext;

  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

// TO GET NEW ACCESSTOKEN VIA REFRESHTOKEN
let isRefreshing = false;
let pendingRequests = [];
backend.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalReq = err.config;

    if (err.response?.status !== 401) return Promise.reject(err);

    if (originalReq._retry) return Promise.reject(err);

    originalReq._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingRequests.push({ resolve, reject });
      })
        .then((newToken) => {
          originalReq.headers.Authorization = `Bearer ${newToken}`;
          return backend(originalReq);
        })
        .catch((err) => Promise.reject(err));
    }

    isRefreshing = true;

    try {
      const res = await backend.post('/userAccessSession');
      const newToken = res.data.accessToken;

      updateRequestContext({ accessToken: newToken });
      if (userSessionActionsRef) userSessionActionsRef.setAccessToken(newToken);

      pendingRequests.forEach((p) => p.resolve(newToken));
      pendingRequests = [];
      isRefreshing = false;

      originalReq.headers.Authorization = `Bearer ${newToken}`;
      return backend(originalReq);
    } catch (refreshErr) {
      pendingRequests.forEach((p) => p.reject(refreshErr));
      pendingRequests = [];
      isRefreshing = false;

      if (userSessionActionsRef) userSessionActionsRef.logout();

      return Promise.reject(refreshErr);
    }
  }
);
