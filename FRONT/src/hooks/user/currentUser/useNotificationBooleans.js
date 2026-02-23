import useFriendsList from '@/hooks/user/currentUser/useFriendsList';
import useRequests from '@/hooks/user/currentUser/useRequests';

const useNotificationBooleans = () => {
  const { data: friendsData } = useFriendsList();
  const { data: requestsData } = useRequests();

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
  const sessionsNotify = hasNewSessionRequests;
  console.log('useNotifications', peopleNotify, requestsData);
  return { peopleNotify, sessionsNotify };
};

export default useNotificationBooleans;
