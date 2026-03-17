import UserProfile from '@c/features/user/UserProfile/UserProfile.jsx';
import Modal from '@c/ui/Modal/Modal';
import React from 'react';

const UserProfileModal = ({
  userId,
  open,
  setOpen,
  noFriendshipButtons = false,
  children
}) => {
  return (
    <Modal open={open} setOpen={setOpen}>
      <UserProfile userId={userId} noFriendshipButtons={noFriendshipButtons} />
      {children}
    </Modal>
  );
};

export default UserProfileModal;
