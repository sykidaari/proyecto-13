import backend from '@/api/config/axios.js';
import useText from '@/contexts/App/hooks/useText.js';
import { useAsyncFieldAvailability } from '@/hooks/useAsyncFieldAvailability.js';
import useSharedFormValidators from '@/hooks/useSharedFormValidators.js';
import defaultFormConfig from '@/utils/defaultFormConfig.js';
import Fieldset from '@c/ui/form/Fieldset/Fieldset.jsx';
import Form from '@c/ui/form/Form/Form.jsx';
import Label from '@c/ui/form/Label/Label.jsx';
import SubmitButton from '@c/ui/form/SubmitButton/SubmitButton.jsx';
import TextField from '@c/ui/form/TextField/TextField.jsx';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Email = ({ onNext, legendText, hasButton, buttonContent }) => {
  const {
    label: labelText,
    validation: validationText,
    alreadyExists: alreadyExistsText
  } = useText('features.user.userFormParts.email');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors
  } = useForm(defaultFormConfig());

  const { required } = useSharedFormValidators();

  const [email, setEmail] = useState('');

  const isValidEmailSyntax = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const { isChecking, runCheck } = useAsyncFieldAvailability({
    value: email,
    fieldName: 'emailAddress',
    queryKeyBase: 'check-email',
    errorMessage: alreadyExistsText,
    setError,
    clearErrors,
    shouldCheck: isValidEmailSyntax,
    checkFn: async (value) => {
      const { data } = await backend.get('/user/check-email', {
        params: { emailAddress: value }
      });
      return data;
    }
  });

  const onSubmit = async (formData) => {
    const result = await runCheck();
    if (result.data?.available === false) return;
    onNext(formData);
  };

  return (
    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Fieldset legendText={legendText}>
        <TextField
          labelText={labelText}
          type='email'
          placeholder='mail@site.com'
          error={errors?.emailAddress?.message}
          {...register('emailAddress', {
            ...required,
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: validationText
            },
            onChange: (e) => setEmail(e.target.value)
          })}
        />

        {hasButton && (
          <SubmitButton isLoading={isChecking}>{buttonContent}</SubmitButton>
        )}
      </Fieldset>
    </Form>
  );
};

export default Email;
