import { useState } from 'react';

export const useSessionModal = () => {
  const [session, setSession] = useState(null);
  const [open, setOpen] = useState(false);

  return { session, setSession, open, setOpen };
};
