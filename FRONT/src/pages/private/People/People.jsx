import R from '@/constants/client/routePaths.js';
import isSelf from '@/contexts/UserSession/helpers/isSelf.js';
import useCurrentUserId from '@/contexts/UserSession/hooks/useCurrentUserId.js';
import UsersSearch from '@/pages/private/Sessions/UsersSearch/UsersSearch.jsx';
import UserProfileModal from '@c/features/user/UserProfile/UserProfileDialog/UserProfileDialog.jsx';
import FullLengthPageWrapper from '@c/layouts/PrivateLayout/FullLengthPageWrapper/FullLengthPageWrapper.jsx';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const People = () => {
  const currentUserId = useCurrentUserId();
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserOpen, setSelectedUserOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <FullLengthPageWrapper>
      <UsersSearch
        onSelectUser={(user) => {
          console.log(R.private.profile.abs);
          if (isSelf(user._id, currentUserId))
            return navigate(R.private.profile.abs);

          setSelectedUser(user);
          setSelectedUserOpen(true);
        }}
      />
      {selectedUser &&
        (isSelf(selectedUser?._id, currentUserId) ? (
          navigate()
        ) : (
          <UserProfileModal
            userId={selectedUser._id}
            open={selectedUserOpen}
            setOpen={setSelectedUserOpen}
          />
        ))}
    </FullLengthPageWrapper>
  );
};

export default People;
