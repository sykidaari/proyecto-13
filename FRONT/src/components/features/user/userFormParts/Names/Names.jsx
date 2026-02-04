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
import InfoToolTip from '@c/ui/InfoToolTip/InfoToolTip.jsx';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Names = ({ onNext, legendText, hasButton, buttonContent }) => {
  const {
    userName: {
      label: userLabelText,
      explanation: explanationText,
      validation: usernameValidationText,
      alreadyExists: usernameAlreadyExistsText
    },
    nickName: { label: nickLabelText },
    tooShort: tooShortText,
    tooLong: tooLongText
  } = useText('features.user.userFormParts.names');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors
  } = useForm(defaultFormConfig());

  const { required } = useSharedFormValidators();

  const [userName, setUserName] = useState('');

  const usernameRegex = /^(?![.])[a-z0-9._]+$/;

  const isValidUsernameSyntax = (v) =>
    v.length >= 3 && v.length <= 30 && usernameRegex.test(v);

  const { isChecking, runCheck } = useAsyncFieldAvailability({
    value: userName,
    fieldName: 'userName',
    queryKeyBase: 'check-username',
    errorMessage: usernameAlreadyExistsText,
    setError,
    clearErrors,
    shouldCheck: isValidUsernameSyntax,
    checkFn: async (value) => {
      const { data } = await backend.get('/user/check-username', {
        params: { userName: value }
      });
      return data;
    }
  });

  const onSubmit = async (formData) => {
    const result = await runCheck();
    if (result.data?.available === false) return;
    onNext(formData);
  };

  const lengthValidator = {
    minLength: {
      value: 3,
      message: tooShortText
    },
    maxLength: {
      value: 30,
      message: tooLongText
    }
  };

  return (
    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Fieldset legendText={legendText}>
        <TextField
          labelText={userLabelText}
          placeholder='username'
          error={errors?.userName?.message}
          {...register('userName', {
            ...required,
            ...lengthValidator,
            pattern: {
              value: usernameRegex,
              message: usernameValidationText
            },
            onChange: (e) => setUserName(e.target.value)
          })}
        >
          <InfoToolTip
            text={explanationText}
            className='absolute right-0 -top-3.5'
          />
        </TextField>

        <TextField
          labelText={nickLabelText}
          placeholder='nickname'
          error={errors?.nickName?.message}
          {...register('nickName', {
            ...required,
            ...lengthValidator
          })}
        />

        {hasButton && (
          <SubmitButton isLoading={isChecking}>{buttonContent}</SubmitButton>
        )}
      </Fieldset>
    </Form>
  );
};

export default Names;
