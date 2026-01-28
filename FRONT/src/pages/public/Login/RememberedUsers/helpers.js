import LSI from '@/constants/client/localStorageItems.js';

export const getLocalRememberedUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(LSI.rememberedUsers)) || [];
  } catch {
    return [];
  }
};

const saveLocalRememberedUsers = (users) => {
  localStorage.setItem(LSI.rememberedUsers, JSON.stringify(users));
};

export const addLocalRememberedUser = (newUser) => {
  const users = getLocalRememberedUsers();

  const filtered = users.filter((u) => u.userName !== newUser.userName);

  const updated = [...filtered, newUser];

  saveLocalRememberedUsers(updated);

  return updated;
};
