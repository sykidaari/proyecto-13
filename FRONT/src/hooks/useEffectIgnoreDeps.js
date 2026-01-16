import { useEffect } from 'react';

//* variant of useEffect to avoid repeating eslint-configuration everywhere (used often in project, must be careful with use)

//* recommendation: write regular useEffect first, then replace with this version if needed

const useEffectIgnoreDeps = (effect, deps) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, deps);
};

export default useEffectIgnoreDeps;
