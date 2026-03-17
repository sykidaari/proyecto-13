import cN from '@/utils/classNameManager';

const Modal = ({ open, setOpen, children, className }) => {
  return (
    <dialog className={cN('modal', open && 'modal-open')}>
      <div className={cN('modal-box max-w-2xs mobile:max-w-md', className)}>
        {children}
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

export default Modal;
