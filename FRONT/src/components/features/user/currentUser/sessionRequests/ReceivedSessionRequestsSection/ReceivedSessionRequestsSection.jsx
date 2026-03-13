import backend from '@/api/config/axios';
import useText from '@/contexts/App/hooks/useText';
import useCurrentUserId from '@/contexts/UserSession/hooks/useCurrentUserId';
import useMarkAllItemsAsSeen from '@/hooks/useMarkAllItemsAsSeen';
import useModal from '@/hooks/useModal';
import useSessionRequestsData from '@/hooks/user/currentUser/useSessionRequestsData';
import SessionCard from '@c/features/sessions/session/SessionCard/SessionCard';
import SessionModal from '@c/features/sessions/session/SessionModal/SessionModal';
import UserProfileModal from '@c/features/user/UserProfile/UserProfileModal/UserProfileModal';
import ListBox from '@c/ui/containers/ListBox/ListBox';
import ListBoxItem from '@c/ui/containers/ListBox/ListBoxItem/ListBoxItem';
import LoadingButtonsSection from '@c/ui/LoadingButtonsSection/LoadingButtonsSection';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const ReceivedSessionRequestsSection = ({ secondary = false }) => {
  const {
    sessions: { title: titleText, invitationFrom: invitiationFromText },
    noRequests: noItemsText,
    from: fromText
  } = useText('features.user.currentUser.receivedRequests');
  const { acceptInvitation: acceptText, rejectInvitation: rejectText } =
    useText('features.sessions.invitations');
  const currentUserId = useCurrentUserId();
  const navigate = useNavigate();

  const {
    item: selectedSession,
    open: modalOpen,
    setOpen: setModalOpen,
    openSelectedItemModal: openSelectedSessionModal
  } = useModal();
  const { open: userModalOpen, setOpen: setUserModalOpen } = useModal();

  const { receivedRequests, isPending, isError, isSuccess } =
    useSessionRequestsData();
  useMarkAllItemsAsSeen(`/${currentUserId}/session/request`, isSuccess);

  const inviterUser = selectedSession?.users?.[0];

  const queryClient = useQueryClient();
  const {
    isPending: mutateIsPending,
    isError: mutateIsError,
    mutate
  } = useMutation({
    mutationFn: async (option) => {
      const { data } = await backend.patch(
        `/${currentUserId}/session/request/${option}`,
        {
          otherUserId: inviterUser?._id,
          requestGroupId: selectedSession.requestGroupId
        }
      );

      return data;
    },
    onSuccess: (data, option) => {
      if (option === 'accept' && data?.sideEffectResult?._id)
        navigate(data?.sideEffectResult?._id);
      else {
        setUserModalOpen(false);
        queryClient.refetchQueries({ queryKey: ['requests'] });
      }
    }
  });

  return (
    <ListBox
      secondary={secondary}
      title={titleText}
      noItemsText={noItemsText}
      noItems={!receivedRequests || !receivedRequests.length}
      isLoading={isPending}
      isError={isError}
    >
      {receivedRequests?.map((item) => (
        <ListBoxItem
          key={item.requestGroupId}
          onClick={() => openSelectedSessionModal(item)}
          isNew={item.isNew}
        >
          <SessionCard sessionParameters={item.sessionParameters} minimal>
            <div className='ml-auto text-xs flex gap-1'>
              <h5>{fromText}:</h5>
              {item.users[0]?.userName}
            </div>
          </SessionCard>
        </ListBoxItem>
      ))}
      {selectedSession && (
        <SessionModal
          sessionParameters={selectedSession?.sessionParameters}
          open={modalOpen}
          setOpen={setModalOpen}
          isActive={selectedSession?.active}
        >
          <div className='flex items-center gap-1.5 mt-2.5'>
            <h4 className='text-xs'>{invitiationFromText}:</h4>

            <button
              onClick={() => {
                setUserModalOpen(true);
              }}
              className='cursor-pointer text-sm font-semibold'
            >
              {inviterUser?.userName}
            </button>
          </div>

          <LoadingButtonsSection
            className='w-full'
            isError={mutateIsError}
            isLoading={mutateIsPending}
          >
            <button className='btn-success' onClick={() => mutate('accept')}>
              {acceptText}
            </button>
            <button className='btn-warning' onClick={() => mutate('reject')}>
              {rejectText}
            </button>
          </LoadingButtonsSection>
        </SessionModal>
      )}

      {inviterUser && (
        <UserProfileModal
          noFriendshipButtons
          userId={inviterUser?._id}
          open={userModalOpen}
          setOpen={setUserModalOpen}
        />
      )}
    </ListBox>
  );
};

export default ReceivedSessionRequestsSection;
