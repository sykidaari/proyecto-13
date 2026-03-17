import useText from '@/contexts/App/hooks/useText';

const SessionParticipants = ({ session, openSelectedUserModal }) => {
  const { participants: participantsText } = useText(
    'features.sessions.session'
  );
  return (
    <div className='flex items-center gap-1.5 mt-2.5'>
      <h4 className='text-xs'>{participantsText}:</h4>
      <ul className='flex gap-1 flex-wrap'>
        {session?.participants?.map((p, i) => (
          <li className='font-semibold text-sm' key={p?.user._id}>
            <button
              onClick={() => {
                openSelectedUserModal(p?.user);
              }}
              className='cursor-pointer'
            >
              {p?.user?.userName}
              {i < session?.participants?.length - 1 && ','}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SessionParticipants;
