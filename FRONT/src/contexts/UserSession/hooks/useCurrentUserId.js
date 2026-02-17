import useUserSessionContext from '@/contexts/UserSession/hooks/useUserSessionContext.js';

const useCurrentUserId = () => useUserSessionContext().state?.userId;

export default useCurrentUserId;
