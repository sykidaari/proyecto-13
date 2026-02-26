import R from '@/constants/client/routePaths';
import useText from '@/contexts/App/hooks/useText';
import ReceivedSessionRequestsSection from '@c/features/user/currentUser/ReceivedSessionRequestsSection';
import FullLengthPageWrapper from '@c/layouts/PrivateLayout/FullLengthPageWrapper/FullLengthPageWrapper';
import MultiListContainer from '@c/ui/containers/MultiListContainer/MultiListContainer';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const Sessions = () => {
  const { createSession: createText } = useText('features.sessions');

  console.log(R.private.sessions.create.rel);

  return (
    <FullLengthPageWrapper className='pt-20 gap-5'>
      <div className='glass p-2.5 rounded-box mx-2.5 max-mini:mx-0'>
        <Link
          to={R.private.sessions.create.rel}
          className='btn btn-lg btn-primary mini:gap-2 pl-2.5'
        >
          <PlusIcon className='size-7 glass rounded-full' />
          {createText}
        </Link>
      </div>

      <MultiListContainer>
        <ReceivedSessionRequestsSection secondary />
      </MultiListContainer>
    </FullLengthPageWrapper>
  );
};

export default Sessions;
