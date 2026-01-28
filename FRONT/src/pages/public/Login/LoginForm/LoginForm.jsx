import ERR from '@/constants/domain/errorCodes.js';
import useText from '@/contexts/App/hooks/useText.js';
import useSharedFormValidators from '@/hooks/useSharedFormValidators.js';
import { useLoginMutation } from '@/hooks/useLoginMutation.js';
import defaultFormConfig from '@/utils/defaultFormConfig.js';
import { isServerProblem } from '@/utils/helpers.js';
import ServerProblem from '@c/ui/ErrorMessage/ServerProblem/ServerProblem.jsx';
import Fieldset from '@c/ui/form/Fieldset/Fieldset.jsx';
import Form from '@c/ui/form/Form/Form.jsx';
import PasswordField from '@c/ui/form/PasswordField/PasswordField.jsx';
import StayLoggedInCheckBox from '@c/ui/form/StayLoggedInCheckBox/StayLoggedInCheckBox.jsx';
import SubmitButton from '@c/ui/form/SubmitButton/SubmitButton.jsx';
import TextField from '@c/ui/form/TextField/TextField.jsx';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const LoginForm = ({ selectedUser }) => {
  const {
    title,
    form: {
      labels: { userNameOrEmail: userNameOrEmailText }
    }
  } = useText('pages.auth.login');

  const [stayLoggedInChecked, setStayLoggedInChecked] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm(
    defaultFormConfig({
      defaultValues: {
        identifier: selectedUser?.emailAddress || '',
        password: ''
      }
    })
  );
  const { required } = useSharedFormValidators();

  const {
    mutate: login,
    isPending,
    error
  } = useLoginMutation(stayLoggedInChecked, setError);

  const hasServerProblem = isServerProblem(error, [
    ERR.user.notFound,
    ERR.user.auth.incorrectCredentials
  ]);

  const onSubmit = (data) => {
    login(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset legendText={title}>
        <TextField
          labelText={userNameOrEmailText}
          type='text'
          error={errors.identifier?.message}
          {...register('identifier', required)}
        />
        <PasswordField
          error={errors.password?.message}
          {...register('password', required)}
        />
        <StayLoggedInCheckBox
          checked={stayLoggedInChecked}
          setChecked={setStayLoggedInChecked}
        />
        {hasServerProblem && <ServerProblem className='mt-2.5' />}
        <SubmitButton isLoading={isPending}>{title}</SubmitButton>
      </Fieldset>
    </Form>
  );
};
export default LoginForm;
