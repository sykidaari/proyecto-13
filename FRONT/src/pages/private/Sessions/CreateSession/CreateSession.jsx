import backend from '@/api/config/axios';
import useText from '@/contexts/App/hooks/useText';
import useCurrentUserId from '@/contexts/UserSession/hooks/useCurrentUserId';
import useMultiStepForm from '@/hooks/form/useMultiStepForm';
import useSteps from '@/hooks/useSteps';
import InviteFriends from '@c/features/sessions/InviteFriends/InviteFriends';
import SessionParameters from '@c/features/sessions/SessionParameters/SessionParameters';
import FullLengthPageWrapper from '@c/layouts/PrivateLayout/FullLengthPageWrapper/FullLengthPageWrapper';
import StepsVisualizer from '@c/ui/StepsVisualizer/StepsVisualizer';
import { useMutation } from '@tanstack/react-query';

const CreateSession = () => {
  const { step, next, isStep } = useSteps();
  const { formData, saveStepData } = useMultiStepForm();
  const currentUserId = useCurrentUserId();

  const nextText = useText('ui.next');

  const { mutate, error, isError, isPending, data } = useMutation({
    mutationFn: async (data) => {
      console.log(data);
      const { data: resData } = await backend.patch(
        `/${currentUserId}/session/request/send`,
        data
      );

      return resData;
    }
  });

  console.log(isError, isPending, error, data);

  return (
    <FullLengthPageWrapper className='gap-7.5 '>
      <StepsVisualizer currentStep={step} totalSteps={2} />

      {isStep(1) && (
        <InviteFriends
          maxAmount={5}
          onSubmit={(data) => {
            saveStepData(data);
            next();
          }}
          buttonContent={nextText}
          buttonClassName='btn-primary'
        />
      )}
      {isStep(2) && (
        <SessionParameters
          onSubmit={(data) => {
            saveStepData(data);
            mutate(formData);
          }}
        />
      )}
    </FullLengthPageWrapper>
  );
};

export default CreateSession;
