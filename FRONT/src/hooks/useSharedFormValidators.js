import useText from '@/contexts/App/hooks/useText.js';

const useSharedFormValidators = () => {
  const requiredText = useText('ui.form.validation.required');

  return { required: { required: requiredText } };
};

export default useSharedFormValidators;
