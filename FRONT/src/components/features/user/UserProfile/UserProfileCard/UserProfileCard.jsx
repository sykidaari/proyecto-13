import useServerProblemtext from '@/contexts/App/hooks/useServerProblemText.js';
import cN from '@/utils/classNameManager.js';
import ErrorMessage from '@c/ui/ErrorMessage/ErrorMessage.jsx';
import ProfilePicture from '@c/ui/ProfilePicture/ProfilePicture.jsx';
import React from 'react';

const UserProfileCard = ({
  user,
  isLoading,
  isError,
  minimal = false,
  listItem = false,
  onClick
}) => {
  const errorText = useServerProblemtext();

  return (
    <section
      className={cN(
        'flex flex-col mobile:flex-row items-center justify-center w-full  p-7 gap-5 rounded-box  h-full',
        minimal && 'flex-row p-1.5 gap-2.5',
        !listItem && 'glass bg-base-200'
      )}
    >
      {isError ? (
        <ErrorMessage text={errorText} />
      ) : isLoading ? (
        <span className='loading' />
      ) : user ? (
        <>
          <div>
            <ProfilePicture
              userImg={user.img}
              className={cN('*:size-30', minimal && '*:size-8')}
            />
          </div>
          <div className={cN('flex-1 flex flex-col gap-2', minimal && 'gap-0')}>
            <h3
              className={cN(
                'text-xl font-semibold text-primary',
                minimal && 'text-sm'
              )}
            >
              {user.userName}
            </h3>
            <h4 className={cN(minimal && 'text-xs')}>{user.nickName}</h4>
          </div>
        </>
      ) : null}
    </section>
  );
};

export default UserProfileCard;
