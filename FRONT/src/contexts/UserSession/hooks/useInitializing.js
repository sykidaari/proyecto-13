import useUserSessionContext from '@/contexts/UserSession/hooks/useUserSessionContext.js';

const useIsInitializing = () => useUserSessionContext().initializing;

export default useIsInitializing;
