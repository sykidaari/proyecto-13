import useText from '@/contexts/App/hooks/useText';
import cN from '@/utils/classNameManager';
import SessionCard from '@c/features/sessions/session/SessionCard/SessionCard';
import { Link } from 'react-router-dom';

const SessionModal = ({
  sessionParameters,
  open,
  setOpen,
  children,
  isActive = false
}) => {
  const openText = useText('features.sessions.openSession');
  console.log;
  return (
    <dialog className={cN('modal', open && 'modal-open')}>
      <div className='modal-box max-w-2xs mobile:max-w-md'>
        <SessionCard sessionParameters={sessionParameters} detail>
          {children}

          {isActive && (
            <Link className='mt-5 btn btn-primary' to={sessionParameters._id}>
              {openText}
            </Link>
          )}
        </SessionCard>
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

export default SessionModal;
