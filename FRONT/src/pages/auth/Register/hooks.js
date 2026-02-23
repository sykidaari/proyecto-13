import backend from '@/api/config/axios.js';
import useText from '@/contexts/App/hooks/useText.js';
import { useLoginMutation } from '@/hooks/useLoginMutation.js';
import { IS_DEV } from '@/utils/env';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export const useMultiStepRegister = (stayLoggedInChecked, setServerError) => {
  const [formData, setFormData] = useState({});

  const loginMutation = useLoginMutation(stayLoggedInChecked, () => {});
  const serverProblemText = useText('ui.error.serverProblem');
  const { loginProblem: loginProblemText } = useText(
    'pages.auth.register.errors'
  );

  const registerMutation = useMutation({
    mutationFn: async () => {
      const { img, ...registerPayload } = formData;

      const { data } = await backend.post('/user/register', registerPayload);
      const userId = data.userId;

      try {
        await loginMutation.mutateAsync({
          identifier: registerPayload.emailAddress,
          password: registerPayload.password
        });
      } catch {
        setServerError(loginProblemText);
        return { success: true };
      }

      if (img) {
        try {
          const fd = new FormData();
          fd.append('img', img);
          await backend.patch(`/user/${userId}/img`, fd);
        } catch (error) {
          if (IS_DEV) console.log(error);
        }
      }

      return { success: true };
    },

    onError: () => {
      setServerError(serverProblemText);
    }
  });

  const saveStepData = (data) => setFormData((prev) => ({ ...prev, ...data }));

  return {
    saveStepData,
    submitAll: registerMutation.mutate,
    submitAllAsync: registerMutation.mutateAsync,
    isSubmitting: registerMutation.isPending || loginMutation.isPending,
    error: registerMutation.error
  };
};
