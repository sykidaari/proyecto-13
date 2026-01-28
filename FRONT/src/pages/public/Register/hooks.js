import backend from '@/api/config/axios.js';
import useText from '@/contexts/App/hooks/useText.js';
import { useLoginMutation } from '@/hooks/useLoginMutation.js';
import { isServerProblem } from '@/utils/helpers.js';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export const useMultiStepRegister = (stayLoggedInChecked, setServerError) => {
  const [formData, setFormData] = useState({});

  const loginMutation = useLoginMutation(stayLoggedInChecked, () => {});
  const serverProblemText = useText('ui.error.serverProblem');

  const registerMutation = useMutation({
    mutationFn: async () => {
      const { img, ...registerPayload } = formData;

      const { data } = await backend.post('/user/register', registerPayload);
      const userId = data.userId;

      if (img) {
        const fd = new FormData();
        fd.append('img', img);

        await backend.post(`/user/${userId}/img`, fd, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      await loginMutation.mutateAsync({
        identifier: registerPayload.emailAddress,
        password: registerPayload.password
      });

      return { success: true };
    },

    onError: (error) => {
      const knownErrors = [];
      if (isServerProblem(error, knownErrors)) {
        setServerError(serverProblemText);
      }
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
