import useText from '@/contexts/App/hooks/useText.js';
import RememberedUserItem from '@/pages/public/Login/RememberedUsers/RememberedUserItem/RememberedUserItem.jsx';

const RememberedUsers = ({ users, onClose, onForget, onSelectUser }) => {
  const { welcomeBack: welcomeBackText, otherAccount: otherAccountText } =
    useText('pages.auth.login.rememberedUsers');

  return (
    <section className='flex flex-col items-center gap-7 '>
      <div className='flex flex-col items-center gap-2.5 text-center'>
        <h2 className='text-xl font-semibold max-mobile:text-lg'>
          {welcomeBackText.title}
        </h2>
        <h3 className='max-mobile:text-sm'>{welcomeBackText.text}</h3>
      </div>

      <div className='bg-base-200 rounded-box max-w-sm w-full'>
        <ul className='menu gap-2.5 bg-base-200 rounded-box *:rounded-box w-full  max-mini:menu-sm h-full'>
          {users.map((u, i) => (
            <RememberedUserItem
              key={i}
              user={u}
              onForget={() => onForget(u)}
              onClick={() => onSelectUser(u)}
            />
          ))}
        </ul>
        <div className='p-2.5'>
          <button
            className='btn btn-outline w-full text-nowrap max-mini:btn-xs'
            onClick={onClose}
          >
            {otherAccountText}
          </button>
        </div>
      </div>
    </section>
  );
};

export default RememberedUsers;
