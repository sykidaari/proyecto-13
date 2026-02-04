import useText from '@/contexts/App/hooks/useText.js';
import ClickableTooltip from '@c/ui/ClickableTooltip/ClickableTooltip.jsx';
import ProfilePicture from '@c/ui/ProfilePicture/ProfilePicture.jsx';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';

const RememberedUserItem = ({ user, onForget, onClick }) => {
  const forgetAccountText = useText(
    'pages.auth.login.rememberedUsers.forgetAccount'
  );

  const { userName, emailAddress, img } = user;

  return (
    <li className='bg-base-300' onClick={onClick}>
      <div
        role='button'
        className='flex items-start gap-3 max-mini:gap-2 py-2.5'
      >
        <ProfilePicture userImg={img} />

        <div>
          <div className='flex gap-2.5'>
            <p className='font-semibold'>{userName}</p>
          </div>

          <p>{emailAddress.replace(/(?<=.).(?=[^@]*?@)/g, '*')}</p>
        </div>

        <ClickableTooltip
          containerClassName='absolute right-1.5'
          initialButtonContent={
            <EllipsisVerticalIcon className='btn btn-ghost btn-xs rounded-full size-10' />
          }
          tooltipContent={forgetAccountText}
          onClick={onForget}
        />
      </div>
    </li>
  );
};

export default RememberedUserItem;
