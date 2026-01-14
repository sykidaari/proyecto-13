import useUserSessionContext from '@/contexts/UserSession/hooks/useUserSessionContext.js';

const useIsLoggedIn = () => useUserSessionContext().state.isLoggedIn;

export default useIsLoggedIn;
