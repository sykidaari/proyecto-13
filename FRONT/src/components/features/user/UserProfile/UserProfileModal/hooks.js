import { useState } from 'react';

export const useUserProfileModal = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  return { user, setUser, open, setOpen };
};
