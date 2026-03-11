import useRequests from '@/hooks/user/currentUser/useRequests';
import useSessionsList from '@/hooks/user/currentUser/useSessionsList';

const groupSessionRequests = (
  requests = [],
  activeIds = new Set(),
  trackNew = false
) => {
  const grouped = new Map();

  requests.forEach((req) => {
    const existing = grouped.get(req.requestGroupId);

    if (existing) {
      existing.users.push(req.user);

      if (trackNew) existing.isNew ||= req.isNewItem;
    } else {
      grouped.set(req.requestGroupId, {
        requestGroupId: req.requestGroupId,
        sessionParameters: req.sessionParameters,
        users: req.user ? [req.user] : [],
        active: activeIds.has(req.requestGroupId),
        ...(trackNew && { isNew: !!req.isNewItem })
      });
    }
  });

  return [...grouped.values()];
};

const useSessionRequestsData = () => {
  const { data: requestsData, isError, isPending, isSuccess } = useRequests();
  const { data } = useSessionsList();

  const sentSessionRequests = requestsData?.sessions?.sent || [];
  const receivedSessionRequests = requestsData?.sessions?.received || [];
  const activeSessions = data?.sessionsList || [];

  const activeIds = new Set(activeSessions.map((s) => s.requestGroupId));

  const sentRequests = groupSessionRequests(sentSessionRequests, activeIds);
  const receivedRequests = groupSessionRequests(
    receivedSessionRequests,
    activeIds,
    true
  );

  return {
    sentRequests,
    receivedRequests,
    isError,
    isPending,
    isSuccess
  };
};
export default useSessionRequestsData;
