import AppContext from '@/contexts/App/AppContext.js';
import { use } from 'react';

const useAppContext = () => use(AppContext);

export default useAppContext;
