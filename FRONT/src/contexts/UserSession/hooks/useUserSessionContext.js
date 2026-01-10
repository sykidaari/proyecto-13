import UserSessionContext from '@/contexts/UserSession/UserSessionContext.js';
import { use } from 'react';

const useUserSessionContext = () => use(UserSessionContext);

export default useUserSessionContext;
