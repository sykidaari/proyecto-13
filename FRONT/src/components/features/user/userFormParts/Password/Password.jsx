import useText from '@/contexts/App/hooks/useText.js';
import useSharedFormValidators from '@/hooks/useSharedFormValidators.js';
import defaultFormConfig from '@/utils/defaultFormConfig.js';
import Fieldset from '@c/ui/form/Fieldset/Fieldset.jsx';
import Form from '@c/ui/form/Form/Form.jsx';
import Label from '@c/ui/form/Label/Label.jsx';
import PasswordField from '@c/ui/form/PasswordField/PasswordField.jsx';
import SubmitButton from '@c/ui/form/SubmitButton/SubmitButton.jsx';
import InfoToolTip from '@c/ui/InfoToolTip/InfoToolTip.jsx';
import React from 'react';
import { useForm } from 'react-hook-form';

const Password = ({ onNext, legendText, hasButton, buttonContent }) => {
  const {
    password: {
      label: passLabelText,
      tooShort: tooShortText,
      tooLong: tooLongText,
      validation: validationText,
      explanation: explanationText
    },
    confirmPassword: { label: confirmLabelText, doesNotMatch: doesNotMatchText }
  } = useText('features.user.userFormParts.password');

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm(defaultFormConfig());

  const { required } = useSharedFormValidators();

  const onSubmit = (data) => {
    const { password } = data;
    onNext({ password });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Fieldset legendText={legendText}>
        <PasswordField
          labelText={passLabelText}
          error={errors?.password?.message}
          {...register('password', {
            ...required,
            minLength: { value: 8, message: tooShortText },
            maxLength: { value: 100, message: tooLongText },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
              message: validationText
            }
          })}
        >
          <InfoToolTip
            text={explanationText}
            className='absolute right-0 -top-3.5'
          />
        </PasswordField>

        <PasswordField
          labelText={confirmLabelText}
          error={errors?.confirmPassword?.message}
          {...register('confirmPassword', {
            ...required,
            validate: (value) =>
              value === getValues('password') || doesNotMatchText
          })}
        />

        {hasButton && <SubmitButton>{buttonContent}</SubmitButton>}
      </Fieldset>
    </Form>
  );
};

export default Password;
