import backend from '@/api/config/axios';
import useText from '@/contexts/App/hooks/useText';
import useCurrentUserId from '@/contexts/UserSession/hooks/useCurrentUserId';
import useRequests from '@/hooks/user/currentUser/useRequests';
import ListBox from '@c/ui/containers/ListBox/ListBox';
import ListBoxItem from '@c/ui/containers/ListBox/ListBoxItem/ListBoxItem';
import { useQuery } from '@tanstack/react-query';

const SessionsSection = () => {
  const currentUserId = useCurrentUserId();
  const { noSessions: noSessionsText, title: titleText } = useText(
    'features.user.currentUser.sessionsSection'
  );

  const {
    data: requestsData,
    isError: isRequestsError,
    isPending: IsRequestsPending
  } = useRequests();

  const { data, isError, isPending } = useQuery({
    queryKey: ['sessionsList', currentUserId],
    queryFn: async () => {
      const { data } = await backend.get(
        `/user/${currentUserId}/private/sessions-list`
      );

      return data;
    },
    enabled: !!currentUserId
  });

  const activeSessions = data?.sessionsList || [];
  const proposedSessions = requestsData?.sessions?.sent || [];

  const allSessions = [...activeSessions, ...proposedSessions];

  console.log(allSessions);

  return (
    <ListBox
      title={titleText}
      noItems={!allSessions || !allSessions.length}
      noItemsText={noSessionsText}
      isError={isError || isRequestsError}
      isLoading={isPending || IsRequestsPending}
    >
      {allSessions?.map((item) => (
        <ListBoxItem key={item._id}>
          <h4>{item.sessionParameters?.sessionName || 'Name'}</h4>
        </ListBoxItem>
      ))}
    </ListBox>
  );
};

export default SessionsSection;
