import useServerProblemtext from '@/contexts/App/hooks/useServerProblemText.js';
import useText from '@/contexts/App/hooks/useText.js';
import useIsSelf from '@/contexts/UserSession/hooks/useIsSelf.js';
import useIsFriend from '@/hooks/user/useIsFriend.js';
import cN from '@/utils/classNameManager.js';
import ErrorMessage from '@c/ui/ErrorMessage/ErrorMessage.jsx';
import ProfilePicture from '@c/ui/ProfilePicture/ProfilePicture.jsx';
import React from 'react';

const UserProfileCard = ({
  user,
  isLoading,
  isError,
  minimal = false,
  listItem = false
}) => {
  const isSelf = useIsSelf(user._id);
  const isFriend = useIsFriend(user._id);

  const { self: selfText, friend: friendText } = useText(
    'features.user.relation'
  );

  const errorText = useServerProblemtext();

  return (
    <section
      className={cN(
        'flex flex-col mobile:flex-row items-center justify-center w-full  p-7 gap-5 rounded-box  h-full',
        minimal ? 'flex-row p-1.5 gap-2.5 min-h-8' : 'min-h-30',
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
          <div
            className={cN(
              'flex-1 flex flex-col gap-2',
              minimal
                ? 'gap-0'
                : 'max-mobile:text-center max-mobile:items-center'
            )}
          >
            <h3
              className={cN(
                'text-xl font-semibold text-primary',
                minimal && 'text-sm'
              )}
            >
              {user.userName}
            </h3>
            <h4 className={cN(minimal && 'text-xs')}>{user.nickName}</h4>
            {
              <span
                className={cN(
                  'badge badge-xs',
                  isSelf
                    ? 'badge-secondary'
                    : isFriend
                      ? 'badge-secondary'
                      : 'invisible',
                  minimal && 'absolute right-2.5 top-2.5'
                )}
              >
                {isSelf ? selfText : isFriend ? friendText : ''}
              </span>
            }
          </div>
        </>
      ) : null}
    </section>
  );
};

export default UserProfileCard;
