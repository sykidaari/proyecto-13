import { useEffect, useState } from 'react';
import LSI from '@/constants/client/localStorageItems.js';
import { getLocalRememberedUsers } from '@/pages/auth/Login/RememberedUsers/helpers.js';

export const useRememberedUsers = () => {
  const [users, setUsers] = useState(getLocalRememberedUsers);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (users.length > 0)
      localStorage.setItem(LSI.rememberedUsers, JSON.stringify(users));
    else localStorage.removeItem(LSI.rememberedUsers);
  }, [users]);

  const forgetUser = (u) => {
    const updated = users.filter((prevU) => prevU !== u);
    setUsers(updated);
  };

  const selectUser = (u) => {
    setSelectedUser(u);
  };

  return {
    users,
    setUsers,
    selectedUser,
    setSelectedUser,

    forgetUser,
    selectUser
  };
};
