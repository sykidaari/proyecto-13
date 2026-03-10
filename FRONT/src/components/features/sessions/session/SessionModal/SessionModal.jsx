import cN from '@/utils/classNameManager';
import SessionCard from '@c/features/sessions/session/SessionCard/SessionCard';
import { Children } from 'react';

const SessionModal = ({ sessionParameters, open, setOpen, children }) => {
  return (
    <dialog className={cN('modal', open && 'modal-open')}>
      <div className='modal-box max-w-2xs mobile:max-w-md'>
        <SessionCard sessionParameters={sessionParameters} detail>
          {children}
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
