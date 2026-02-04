import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useLoginViews = (users) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawView = searchParams.get('view');

  useEffect(() => {
    if (users.length > 0 && !rawView) {
      setSearchParams({ view: 'remembered' }, { replace: true });
    }
  }, [users, rawView, setSearchParams]);

  const view = (() => {
    if (users.length === 0) return 'login';
    if (rawView === 'login') return 'login';
    if (rawView === 'remembered') return 'remembered';
    return 'remembered';
  })();
  const goToLogin = () => setSearchParams({ view: 'login' });

  return { view, goToLogin };
};
