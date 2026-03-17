import useText from '@/contexts/App/hooks/useText';
import useModal from '@/hooks/useModal';
import MediaCard from '@c/features/media/MediaSection/MediaCardStack/MediaCard/MediaCard';
import MatchModal from '@c/features/sessions/session/MatchModal/MatchModal';
import SessionCard from '@c/features/sessions/session/SessionCard/SessionCard';
import SessionParticipants from '@c/features/sessions/session/SessionParticipants/SessionParticipants';
import LoadingButtonsSection from '@c/ui/LoadingButtonsSection/LoadingButtonsSection';
import { Menubox } from '@c/ui/MenuBox/Menubox';
import Modal from '@c/ui/Modal/Modal';
import { useState } from 'react';

const SessionMenu = ({ session, openSelectedUserModal }) => {
  const {
    sessionDetails: detailsTitle,
    sessionOptions: {
      title: OptionsTitle,
      options: {
        leaveSession: {
          title: leaveTitle,
          confirmation: leaveConfirmation,
          yes: leaveYes,
          no: leaveNo
        }
      }
    },
    matchedMedias: { title: matchedTitle, none: noMatchesText }
  } = useText('features.sessions.session.menu');

  const [leaveModalOpen, setleaveModalOpen] = useState(false);

  const {
    open: selectedMatchOpen,
    setOpen: setSelectedMatchOpen,
    item: selectedMatch,
    openSelectedItemModal: openSelectedMatchModal
  } = useModal();

  return (
    <>
      <div className='p-2.5 max-mobile:px-1.5 flex flex-col overflow-y-auto items-center mb-2.5'>
        <div className='flex items-center flex-col mobile:flex-row mobile:gap-2.5'>
          <Menubox title={detailsTitle} className='gap-0'>
            <SessionCard sessionParameters={session} detail>
              <SessionParticipants
                session={session}
                openSelectedUserModal={openSelectedUserModal}
              />
            </SessionCard>
          </Menubox>
          <Menubox title={OptionsTitle}>
            <button
              className='btn btn-outline'
              onClick={() => setleaveModalOpen(true)}
            >
              {leaveTitle}
            </button>
          </Menubox>
        </div>

        <div className='divider divider-neutral max-mobile:hidden' />
        <Menubox noDivider title={matchedTitle} bigTitle className='gap-5'>
          {session?.matchedMedias?.length ? (
            <ul className='flex flex-wrap justify-center gap-2.5'>
              {session?.matchedMedias?.map((media) => (
                <li
                  key={media._id}
                  className='small:w-[40dvw] mobile:max-w-sm flex justify-center'
                >
                  <button
                    onClick={() => openSelectedMatchModal(media)}
                    className='cursor-pointer'
                  >
                    <MediaCard
                      noDetails
                      media={media}
                      specifyShowType={!!session?.includedMedia?.mediaType}
                    />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className='text-info text-center text-sm'>{noMatchesText}</p>
          )}
        </Menubox>
      </div>
      {leaveModalOpen && (
        <Modal open={leaveModalOpen} setOpen={setleaveModalOpen}>
          <Menubox noDivider title={leaveConfirmation} className='gap-2.5'>
            <LoadingButtonsSection>
              <button className='btn-warning'>{leaveYes}</button>
              <button onClick={() => setleaveModalOpen(false)}>
                {leaveNo}
              </button>
            </LoadingButtonsSection>
          </Menubox>
        </Modal>
      )}

      {selectedMatch && (
        <MatchModal
          open={selectedMatchOpen}
          setOpen={setSelectedMatchOpen}
          specifyShowType={!!session?.includedMedia?.mediaType}
          media={selectedMatch}
          notNew
        />
      )}
    </>
  );
};

export default SessionMenu;
