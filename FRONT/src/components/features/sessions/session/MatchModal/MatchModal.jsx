import useText from '@/contexts/App/hooks/useText';
import MediaCard from '@c/features/media/MediaSection/MediaCardStack/MediaCard/MediaCard';
import Modal from '@c/ui/Modal/Modal';
import React from 'react';

const MatchModal = ({
  open,
  setOpen,
  media,
  specifyShowType,
  notNew = false
}) => {
  const matchText = useText('features.sessions.session.newMatch');

  return (
    <Modal open={open} setOpen={setOpen} className='max-w-fit mobile:max-w-fit'>
      <div className='size-full flex flex-col justify-center items-center gap-5'>
        {!notNew && (
          <>
            <h4 className='uppercase text-success relative z-10 font-semibold text-lg'>
              {matchText}
            </h4>
            <div className='absolute inset-0 skeleton rounded-box' />
          </>
        )}

        <MediaCard media={media} specifyShowType={specifyShowType} />
      </div>
    </Modal>
  );
};

export default MatchModal;
