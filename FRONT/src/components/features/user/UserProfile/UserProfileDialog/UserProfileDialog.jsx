import cN from '@/utils/classNameManager.js';
import UserProfile from '@c/features/user/UserProfile/UserProfile.jsx';
import React from 'react';

const UserProfileModal = ({ userId, open, setOpen }) => {
  return (
    <dialog className={cN('modal', open && 'modal-open')}>
      <div className='modal-box max-w-2xs mobile:max-w-fit'>
        <UserProfile userId={userId} />
      </div>
      <div
        method='dialog'
        className='modal-backdrop cursor-pointer'
        onClick={() => {
          setOpen(false);
        }}
      ></div>
    </dialog>
  );
};

export default UserProfileModal;
