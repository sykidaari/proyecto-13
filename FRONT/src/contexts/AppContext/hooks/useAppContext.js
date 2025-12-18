import AppContext from '@/contexts/AppContext/AppContext.js';
import { use } from 'react';

const useAppContext = () => use(AppContext);

export default useAppContext;
