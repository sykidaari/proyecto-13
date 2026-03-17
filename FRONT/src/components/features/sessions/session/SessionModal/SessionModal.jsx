import useText from '@/contexts/App/hooks/useText';
import SessionCard from '@c/features/sessions/session/SessionCard/SessionCard';
import Modal from '@c/ui/Modal/Modal';
import { Link } from 'react-router-dom';

const SessionModal = ({
  sessionParameters,
  open,
  setOpen,
  children,
  isActive = false
}) => {
  const openText = useText('features.sessions.openSession');

  return (
    <Modal open={open} setOpen={setOpen}>
      <SessionCard sessionParameters={sessionParameters} detail>
        {children}

        {isActive && (
          <Link className='mt-5 btn btn-primary' to={sessionParameters._id}>
            {openText}
          </Link>
        )}
      </SessionCard>
    </Modal>
  );
};

export default SessionModal;
