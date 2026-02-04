import backend from '@/api/config/axios.js';
import { updateRequestContext } from '@/api/config/requestContext.js';
import ERR from '@/constants/domain/errorCodes.js';
import useAppContext from '@/contexts/App/hooks/useAppContext.js';
import useText from '@/contexts/App/hooks/useText.js';
import syncAppStateFromBackend from '@/contexts/App/utils/syncAppStateFromBackend.js';
import useUserSessionContext from '@/contexts/UserSession/hooks/useUserSessionContext.js';
import { addLocalRememberedUser } from '@/pages/auth/Login/RememberedUsers/helpers.js';
import { backendErrorMessage } from '@/utils/helpers.js';
import { useMutation } from '@tanstack/react-query';

export const useLoginMutation = (stayLoggedInChecked, setError) => {
  const {
    userNotFound: userNotFoundText,
    incorrectCredentials: incorrectCredentialsText
  } = useText('pages.auth.login.form.errors');

  const {
    actions: { login: contextLogin }
  } = useUserSessionContext();
  const { actions: AppActions, state: appState } = useAppContext();

  const mutation = useMutation({
    mutationFn: async (user) => {
      const isEmail = user.identifier.includes('@');
      const credentials = {
        [isEmail ? 'emailAddress' : 'userName']: user.identifier,
        password: user.password
      };

      const { data } = await backend.post('/user/login', {
        ...credentials,
        rememberMe: stayLoggedInChecked
      });

      return data;
    },
    onSuccess: async (data) => {
      const {
        accessToken,
        user: { _id: userId, userName, nickName, img, emailAddress }
      } = data;

      updateRequestContext({ accessToken });
      contextLogin({ accessToken, userId, userName, nickName, img });
      await syncAppStateFromBackend(data.user, AppActions, appState);
      addLocalRememberedUser({ userName, img, emailAddress });
    },
    onError: (error) => {
      const errorMessage = backendErrorMessage(error);

      if (errorMessage === ERR.user.notFound) {
        setError('identifier', {
          type: 'backend',
          message: userNotFoundText
        });
      }

      if (errorMessage === ERR.user.auth.incorrectCredentials) {
        setError('password', {
          type: 'backend',
          message: incorrectCredentialsText
        });
      }
    }
  });

  return mutation;
};
