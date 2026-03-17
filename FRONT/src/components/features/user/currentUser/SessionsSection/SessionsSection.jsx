import useText from '@/contexts/App/hooks/useText';
import useUserSessionContext from '@/contexts/UserSession/hooks/useUserSessionContext';
import useMarkAllItemsAsSeen from '@/hooks/useMarkAllItemsAsSeen';
import useModal from '@/hooks/useModal';
import useSessionsList from '@/hooks/user/currentUser/useSessionsList';
import SessionCard from '@c/features/sessions/session/SessionCard/SessionCard';
import SessionModal from '@c/features/sessions/session/SessionModal/SessionModal';
import SessionParticipants from '@c/features/sessions/session/SessionParticipants/SessionParticipants';
import UserProfileModal from '@c/features/user/UserProfile/UserProfileModal/UserProfileModal';
import ListBox from '@c/ui/containers/ListBox/ListBox';
import ListBoxItem from '@c/ui/containers/ListBox/ListBoxItem/ListBoxItem';

//! NEED TO ADD ISUPDATED, ALSO FOR NOTIFS
const SessionsSection = () => {
  const { noSessions: noSessionsText, title: titleText } = useText(
    'features.user.currentUser.sessionsSection'
  );

  const {
    state: { userName: currentUserName, userId: currentUserId }
  } = useUserSessionContext();

  const {
    item: selectedSession,
    open: modalOpen,
    setOpen: setModalOpen,
    openSelectedItemModal: openSelectedSessionModal
  } = useModal();

  const {
    item: selectedUser,
    open: userModalOpen,
    setOpen: setUserModalOpen,
    openSelectedItemModal: openSelectedUserModal
  } = useModal();
  const { data, isError, isPending, isSuccess } = useSessionsList();
  const sessions = data?.sessionsList;

  useMarkAllItemsAsSeen(
    `/user/${currentUserId}/private/sessions-list`,
    isSuccess
  );

  return (
    <>
      <ListBox
        title={titleText}
        noItems={!sessions || !sessions.length}
        noItemsText={noSessionsText}
        isError={isError}
        isLoading={isPending}
      >
        {sessions?.map((item) => (
          <ListBoxItem
            key={item._id}
            onClick={() => openSelectedSessionModal(item)}
            isNew={item.isNewItem}
          >
            <SessionCard sessionParameters={item.session}>
              <ul className='ml-auto'>
                {(() => {
                  const others = item.session?.participants?.filter(
                    (p) => p?.user?.userName !== currentUserName
                  );

                  if (!others?.length) return null;

                  return (
                    <li className='text-sm'>
                      {others[0]?.user?.userName}
                      {others.length > 1 && ` +${others.length - 1}`}
                    </li>
                  );
                })()}
              </ul>
            </SessionCard>
          </ListBoxItem>
        ))}
      </ListBox>
      {selectedSession && (
        <SessionModal
          open={modalOpen}
          setOpen={setModalOpen}
          sessionParameters={selectedSession.session}
          isActive
        >
          <SessionParticipants
            session={selectedSession?.session}
            openSelectedUserModal={openSelectedUserModal}
          />
        </SessionModal>
      )}
      {selectedUser && (
        <UserProfileModal
          noFriendshipButtons
          userId={selectedUser?._id}
          open={userModalOpen}
          setOpen={setUserModalOpen}
        />
      )}
    </>
  );
};

export default SessionsSection;
