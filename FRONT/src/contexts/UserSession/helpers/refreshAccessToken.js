import backend from '@/api/config/axios';

let refreshPromise = null;

export const refreshAccessToken = async () => {
  if (!refreshPromise) {
    refreshPromise = backend.post('/userAccessSession').finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
};
