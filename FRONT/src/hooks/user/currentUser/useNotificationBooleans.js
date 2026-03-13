import useFriendsList from '@/hooks/user/currentUser/useFriendsList';
import useRequests from '@/hooks/user/currentUser/useRequests';
import useSessionsList from '@/hooks/user/currentUser/useSessionsList';

const useNotificationBooleans = () => {
  const { data: friendsData } = useFriendsList();
  const { data: requestsData } = useRequests();
  const { data: sessionsData } = useSessionsList();

  const hasNewFriends = friendsData?.friendsList?.some(
    (item) => item.isNewItem
  );
  const hasNewfriendRequests = requestsData?.friends?.received?.some(
    (item) => item.isNewItem
  );
  const peopleNotify = hasNewFriends || hasNewfriendRequests;

  const hasNewSessionRequests = requestsData?.sessions?.received?.some(
    (item) => item.isNewItem
  );

  const hasNewSessions = sessionsData?.sessionsList?.some(
    (item) => item.isNewItem
  );
  const sessionsNotify = hasNewSessionRequests || hasNewSessions;

  return { peopleNotify, sessionsNotify };
};

export default useNotificationBooleans;
