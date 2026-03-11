import backend from '@/api/config/axios';
import useText from '@/contexts/App/hooks/useText';
import useCurrentUserId from '@/contexts/UserSession/hooks/useCurrentUserId';
import useSessionRequestsData from '@/hooks/user/currentUser/useSessionRequestsData';

import SessionCard from '@c/features/sessions/session/SessionCard/SessionCard';
import { useSessionModal } from '@c/features/sessions/session/SessionModal/hooks';
import SessionModal from '@c/features/sessions/session/SessionModal/SessionModal';
import { useUserProfileModal } from '@c/features/user/UserProfile/UserProfileModal/hooks';
import UserProfileModal from '@c/features/user/UserProfile/UserProfileModal/UserProfileModal';
import ListBox from '@c/ui/containers/ListBox/ListBox';
import ListBoxItem from '@c/ui/containers/ListBox/ListBoxItem/ListBoxItem';
import LoadingButtonsSection from '@c/ui/LoadingButtonsSection/LoadingButtonsSection';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';

const SentSessionRequestsSection = ({ secondary = false }) => {
  const {
    sessions: { title: titleText },
    noRequests: noItemsText,
    to: ToText,
    invited: invitedText
  } = useText('features.user.currentUser.sentRequests');
  const cancelText = useText('features.sessions.invitations.cancelInvitation');

  const currentUserId = useCurrentUserId();

  const { sentRequests, isPending, isError } = useSessionRequestsData();

  const {
    session: selectedSession,
    setSession: setSelectedSession,
    open: modalOpen,
    setOpen: setModalOpen
  } = useSessionModal();

  const {
    user: selectedUser,
    setUser: setSelectedUser,
    open: userModalOpen,
    setOpen: setUserModalOpen
  } = useUserProfileModal();

  const queryClient = useQueryClient();
  const {
    isPending: cancelIsPending,
    isError: cancelIsError,

    mutate: cancelRequest
  } = useMutation({
    mutationFn: async () => {
      const { data } = await backend.patch(
        `/${currentUserId}/session/request/cancel`,
        {
          otherUserId: selectedUser._id,
          requestGroupId: selectedSession.requestGroupId
        }
      );

      return data;
    },
    onSuccess: () => {
      setUserModalOpen(false);
      queryClient.refetchQueries({ queryKey: ['requests'] });
    }
  });

  return (
    <>
      <ListBox
        secondary={secondary}
        title={titleText}
        noItemsText={noItemsText}
        noItems={!sentRequests || !sentRequests.length}
        isLoading={isPending}
        isError={isError}
      >
        {sentRequests?.map((item) => (
          <ListBoxItem
            key={item.requestGroupId}
            onClick={() => {
              setSelectedSession(item);
              setModalOpen(true);
            }}
          >
            <SessionCard sessionParameters={item.sessionParameters} minimal>
              <div className='ml-auto text-xs flex gap-1'>
                <h5>{ToText}:</h5>
                {item.users[0]?.userName}
                {item.users.length > 1 && ` +${item.users.length - 1}`}
              </div>
            </SessionCard>
          </ListBoxItem>
        ))}
      </ListBox>
      {modalOpen && (
        <SessionModal
          sessionParameters={selectedSession?.sessionParameters}
          open={modalOpen}
          setOpen={setModalOpen}
          isActive={selectedSession?.active}
        >
          <div className='flex items-center gap-1.5 mt-2.5'>
            <h4 className='text-xs'>{invitedText}:</h4>
            <ul className='flex gap-1 flex-wrap'>
              {selectedSession?.users?.map((user, i) => (
                <li className='font-semibold text-sm' key={user._id}>
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setUserModalOpen(true);
                    }}
                    className='cursor-pointer'
                  >
                    {user.userName}
                    {i < selectedSession.users.length - 1 && ','}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </SessionModal>
      )}

      {selectedUser && (
        <UserProfileModal
          noFriendshipButtons
          userId={selectedUser._id}
          open={userModalOpen}
          setOpen={setUserModalOpen}
        >
          <LoadingButtonsSection
            className='mt-2.5'
            isError={cancelIsError}
            isLoading={cancelIsPending}
          >
            <button onClick={cancelRequest}>{cancelText}</button>
          </LoadingButtonsSection>
        </UserProfileModal>
      )}
    </>
  );
};

export default SentSessionRequestsSection;
