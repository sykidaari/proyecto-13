import R from '@/constants/client/routePaths';
import useText from '@/contexts/App/hooks/useText';
import useFriendsList from '@/hooks/user/currentUser/useFriendsList';
import cN from '@/utils/classNameManager';
import ReceivedSessionRequestsSection from '@c/features/user/currentUser/ReceivedSessionRequestsSection/ReceivedSessionRequestsSection';
import SentSessionRequestsSection from '@c/features/user/currentUser/SentSessionRequestsSection/SentSessionRequestsSection';
import SessionsSection from '@c/features/user/currentUser/SessionsSection/SessionsSection';
import FullLengthPageWrapper from '@c/layouts/PrivateLayout/FullLengthPageWrapper/FullLengthPageWrapper';
import MultiListContainer from '@c/ui/containers/MultiListContainer/MultiListContainer';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Sessions = () => {
  const { createSession: createText, noFriends: NoFriendsText } =
    useText('features.sessions');
  const { data } = useFriendsList();

  const noFriends = !data?.friendsList || !data?.friendsList.length;

  return (
    <FullLengthPageWrapper className='pt-20 gap-10'>
      <div
        className={cN(
          'glass p-2.5 rounded-box mx-2.5 max-mini:mx-0',
          noFriends && 'tooltip before:max-w-full'
        )}
        data-tip={NoFriendsText}
      >
        <Link
          to={R.private.sessions.create.rel}
          className={cN(
            'btn btn-lg btn-primary mini:gap-2 pl-2.5',
            noFriends && 'btn-disabled'
          )}
          onClick={(e) => {
            if (noFriends) {
              e.preventDefault();
            }
          }}
        >
          <PlusIcon className='size-7 glass rounded-full' />
          {createText}
        </Link>
      </div>

      <MultiListContainer>
        <SessionsSection />

        <div className='flex flex-col gap-2.5  mobile:[&>*:first-child]:flex-3  mobile:[&>*:nth-child(2)]:flex-5'>
          <SentSessionRequestsSection secondary />
          <ReceivedSessionRequestsSection secondary />
        </div>
      </MultiListContainer>
    </FullLengthPageWrapper>
  );
};

export default Sessions;
