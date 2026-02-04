import cN from '@/utils/classNameManager.js';
import { UserCircleIcon } from '@heroicons/react/24/solid';

const ProfilePicture = ({ userImg, className }) => {
  return (
    <div
      className={cN(
        `*:size-10 *:rounded-full rounded-full overflow-hidden border border-primary *:object-cover flex items-center justify-center`,
        className
      )}
    >
      {userImg ? (
        <img src={userImg} alt='profile-picture' />
      ) : (
        <UserCircleIcon className='w-full h-full scale-145 text-primary' />
      )}
    </div>
  );
};

export default ProfilePicture;
