import useRelationship from '@/hooks/people/useRelationship';

const useIsFriend = (targetUserId) => {
  const { data } = useRelationship(targetUserId);

  return data?.isFriend ?? false;
};

export default useIsFriend;
