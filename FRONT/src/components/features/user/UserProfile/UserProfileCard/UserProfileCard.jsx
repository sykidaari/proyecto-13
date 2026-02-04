import backend from '@/api/config/axios.js';
import useServerProblemtext from '@/contexts/App/hooks/useServerProblemText.js';
import useUserProfile from '@/hooks/user/useUserProfile.js';
import ErrorMessage from '@c/ui/ErrorMessage/ErrorMessage.jsx';
import ProfilePicture from '@c/ui/ProfilePicture/ProfilePicture.jsx';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const UserProfileCard = ({ userId }) => {
  const { data, isPending, error } = useUserProfile(userId);

  const errorText = useServerProblemtext();

  console.log(data);

  return (
    <section className='flex flex-col mobile:flex-row items-center justify-center w-full bg-base-200 p-7 gap-5 rounded-box glass h-full'>
      {error ? (
        <ErrorMessage text={errorText} />
      ) : isPending ? (
        <span className='loading' />
      ) : data ? (
        <>
          <div>
            <ProfilePicture userImg={data.img} className='*:size-30' />
          </div>
          <div className='flex-1 flex flex-col gap-2'>
            <h3 className='text-xl font-semibold text-primary'>
              {data.userName}
            </h3>
            <h4>{data.nickName}</h4>
          </div>
        </>
      ) : null}
    </section>
  );
};

export default UserProfileCard;
