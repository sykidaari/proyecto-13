import backend from '@/api/config/axios';
import useAppContext from '@/contexts/App/hooks/useAppContext';
import useText from '@/contexts/App/hooks/useText';
import useCurrentUserId from '@/contexts/UserSession/hooks/useCurrentUserId';
import useFetchMedias from '@/hooks/media/useFetchMedias';
import useMediaSwipeIndex from '@/hooks/media/useMediaSwipeIndex';
import usePrefetchNextPage from '@/hooks/media/usePrefetchNetxPage';
import useEffectIgnoreDeps from '@/hooks/useEffectIgnoreDeps';
import useModal from '@/hooks/useModal';
import {
  buildShowsToRender,
  normalizeMediaForBackend
} from '@/pages/private/Sessions/Session/helpers';
import MediaSection from '@c/features/media/MediaSection/MediaSection';
import MatchModal from '@c/features/sessions/session/MatchModal/MatchModal';
import SessionMenu from '@c/features/sessions/session/SessionMenu/SessionMenu';
import SectionBox from '@c/ui/containers/SectionBox/SectionBox';
import ServerProblem from '@c/ui/ErrorMessage/ServerProblem/ServerProblem';
import {
  CheckIcon,
  EllipsisVerticalIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

const Session = () => {
  const { open: openMenuText, close: closeMenutext } = useText(
    'features.sessions.session.menu'
  );
  const currentUserId = useCurrentUserId();
  const {
    state: { language: currentLanguage }
  } = useAppContext();

  const { sessionId } = useParams();
  const {
    data: session,
    isError,
    isPending
  } = useQuery({
    queryKey: ['session', currentUserId, sessionId],
    queryFn: async () => {
      const { data } = await backend.get(
        `/${currentUserId}/session/${sessionId}`
      );

      return data;
    }
  });
  const { includedMedia = {} } = session || {};
  const {
    shows: newShows,
    isFetching: newShowsIsFetching,
    isError: newShowsIsError,
    hasNextPage,
    isFetching,
    fetchNextPage
  } = useFetchMedias({
    ...(includedMedia.mediaType && {
      showType: includedMedia.mediaType
    }),
    ...(includedMedia.availability?.services?.length && {
      services: includedMedia.availability.services,
      countryCode: includedMedia.availability.country
    }),
    ...(includedMedia.genres && { genres: includedMedia.genres }),
    ...(includedMedia.keyWord && { keyword: includedMedia.keyWord })
  });

  const {
    open: newMatchModalOpen,
    setOpen: setNewMatchModalOpen,
    item: newMatch,
    openSelectedItemModal: openNewMatch
  } = useModal();

  const queryClient = useQueryClient();
  const { mutate: proposeMatch } = useMutation({
    mutationFn: async (media) => {
      const body = normalizeMediaForBackend(media, currentLanguage);
      const { data } = await backend.patch(
        `/${currentUserId}/session/${sessionId}/interact/propose-match`,
        body
      );

      return data;
    },
    onSuccess: (data, media) => {
      queryClient.refetchQueries({ queryKey: ['session'] });

      if (data.isMatch) {
        openNewMatch(media);
      }
    }
  });
  const { mutate: discardMedia } = useMutation({
    mutationFn: async (media) => {
      const { data } = await backend.patch(
        `/${currentUserId}/session/${sessionId}/interact/discard`,
        { mediaId: media.id }
      );

      return data;
    },
    onSuccess: () => queryClient.refetchQueries({ queryKey: ['session'] })
  });

  const deckRef = useRef([]);

  const [showsToRender, setShowsToRender] = useState([]);
  const { index, advance } = useMediaSwipeIndex(showsToRender.length);
  usePrefetchNextPage({
    totalLength: showsToRender.length,
    currentIndex: index,
    hasNextPage,
    isFetching,
    fetchNextPage
  });

  useEffectIgnoreDeps(() => {
    const deck =
      buildShowsToRender(newShows, session, currentUserId, currentLanguage) ||
      [];

    deckRef.current = deck;
    setShowsToRender(deck);
  }, [newShows, currentUserId, currentLanguage]);

  useEffectIgnoreDeps(() => {
    if (!session) return;

    const discardedIds =
      session.discardedMedias?.map((m) => m.mediaId.toString()) || [];
    const matchedIds =
      session.matchedMedias?.map((m) => m._id.toString()) || [];

    const filtered = deckRef.current.filter((show, i) => {
      if (i < index) return true;

      const id = show.id.toString();

      return !discardedIds.includes(id) && !matchedIds.includes(id);
    });

    deckRef.current = filtered;
    setShowsToRender(filtered);
  }, [session]);

  useEffectIgnoreDeps(() => {
    if (session && showsToRender.length === 0 && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [showsToRender.length, hasNextPage, isFetching, session]);

  const [sessionMenuOpen, setSessionMenuOpen] = useState(false);

  return (
    <>
      <div className='flex size-full justify-center items-center'>
        {session ? (
          <SectionBox className='relative overflow-hidden'>
            <div className='flex w-full z-60'>
              <button
                className='btn btn-circle btn-secondary ml-auto tooltip tooltip-left'
                data-tip={sessionMenuOpen ? closeMenutext : openMenuText}
                onClick={() => setSessionMenuOpen(!sessionMenuOpen)}
              >
                <EllipsisVerticalIcon className='size-7' />
              </button>
            </div>

            <MediaSection
              shows={showsToRender}
              isLoading={newShowsIsFetching}
              isError={newShowsIsError}
              specifyShowType={!!includedMedia.mediaType}
              hasGoBackButton
              hasNextPage={hasNextPage}
              PositiveButton={({ onClick }) => (
                <button onClick={onClick} className='btn-primary'>
                  <CheckIcon />
                </button>
              )}
              NegativeButton={({ onClick }) => (
                <button onClick={onClick} className='btn-accent'>
                  <XMarkIcon />
                </button>
              )}
              onPositive={(current) => {
                advance();
                proposeMatch(current);
              }}
              onNegative={(current) => {
                advance();
                discardMedia(current);
              }}
            />

            {sessionMenuOpen && (
              <div className='absolute inset-0 z-50 bg-secondary flex flex-col items-center'>
                <SessionMenu session={session} />
              </div>
            )}
          </SectionBox>
        ) : (
          <>
            {isPending && <span className='loading loading-xl text-primary' />}
            {isError && (
              <ServerProblem className='text-sm mobile:text-base text-center' />
            )}
          </>
        )}
      </div>

      {newMatch && (
        <MatchModal
          open={newMatchModalOpen}
          setOpen={setNewMatchModalOpen}
          media={newMatch}
          specifyShowType={!!includedMedia.mediaType}
        />
      )}
    </>
  );
};

export default Session;
