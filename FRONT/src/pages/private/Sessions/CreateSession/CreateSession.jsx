import backend from '@/api/config/axios';
import R from '@/constants/client/routePaths';
import useText from '@/contexts/App/hooks/useText';
import useCurrentUserId from '@/contexts/UserSession/hooks/useCurrentUserId';
import useMultiStepForm from '@/hooks/form/useMultiStepForm';
import useSteps from '@/hooks/useSteps';
import cN from '@/utils/classNameManager';
import InviteFriends from '@c/features/sessions/InviteFriends/InviteFriends';
import SessionParameters from '@c/features/sessions/SessionParameters/SessionParameters';
import FullLengthPageWrapper from '@c/layouts/PrivateLayout/FullLengthPageWrapper/FullLengthPageWrapper';
import ServerProblem from '@c/ui/ErrorMessage/ServerProblem/ServerProblem';
import StepsVisualizer from '@c/ui/StepsVisualizer/StepsVisualizer';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CreateSession = () => {
  const { step, next, isStep } = useSteps();
  const { formData, saveStepData } = useMultiStepForm();
  const currentUserId = useCurrentUserId();

  const nextText = useText('ui.next');

  const { title: successText, button: successButtonText } = useText(
    'features.sessions.session.created'
  );

  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState();

  const { mutate, isError, isPending, isSuccess } = useMutation({
    mutationFn: async (data) => {
      console.log('sending data:', data);
      const { data: resData } = await backend.patch(
        `/${currentUserId}/session/request/send`,
        data
      );
      console.log('res data:', resData);
      return resData;
    }
  });

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
            setModalOpen(true);

            // important to do like this, not with saveStepData, as is async process
            mutate({ ...formData, ...data });
          }}
        />
      )}

      {(isError || isPending || isSuccess) && (
        <dialog
          className={cN('modal', modalOpen && 'modal-open')}
          open={modalOpen}
        >
          <div className='modal-box h-1/3 flex justify-center items-center'>
            {isPending && (
              <span className='loading mini:loading-xl text-primary' />
            )}
            {isError && <ServerProblem className='mini:text-sm text-center' />}

            {isSuccess && (
              <div className='flex flex-col gap-5 items-center'>
                <h3>{successText}</h3>
                <Link to={R.private.sessions.abs} className='btn btn-success'>
                  {successButtonText}
                </Link>
              </div>
            )}
          </div>
          <div
            method='dialog'
            className='modal-backdrop cursor-pointer'
            onClick={() => {
              if (isPending) return;
              if (isSuccess) navigate(R.private.sessions.abs);

              setModalOpen(false);
            }}
          ></div>
        </dialog>
      )}
    </FullLengthPageWrapper>
  );
};

export default CreateSession;
