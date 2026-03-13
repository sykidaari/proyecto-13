import useText from '@/contexts/App/hooks/useText';
import cN from '@/utils/classNameManager';
import GenresBadgesList from '@c/features/media/GenresBadgesList/GenresBadgesList';
import { useEnrichedServices } from '@c/features/media/StreamingBadgesList/hooks';
import StreamingBadgesList from '@c/features/media/StreamingBadgesList/StreamingBadgesList';

const SessionCard = ({
  sessionParameters,
  children,
  minimal = false,
  detail = false
}) => {
  const {
    untitled: untitledText,
    parameters: {
      mediaType: { options: mediaTypeOptions },
      genres: { options: genresOptions }
    }
  } = useText('features.sessions.session');

  const media = sessionParameters.includedMedia;
  const sessionName = sessionParameters.sessionName || untitledText;

  const enrichedServices = useEnrichedServices({
    streamingOptions: [
      {
        country: media?.availability?.country,
        services: media?.availability?.services
      }
    ]
  });

  return (
    <article
      className={cN(
        'px-2.5 py-1.5 flex gap-2.5 items-center',
        detail && 'flex-col'
      )}
    >
      <h4
        className={cN(
          minimal ? 'text-sm py-0.5' : 'text-base py-1',
          detail && 'text-lg text-primary mb-2.5 h-auto font-semibold',
          !sessionParameters.sessionName &&
            (minimal
              ? 'text-xs text-base-content/50'
              : 'text-sm text-base-content/50')
        )}
      >
        {sessionName}
      </h4>

      {detail && (
        <>
          {media?.mediaType && (
            <span className='badge badge-primary badge-soft'>
              {mediaTypeOptions[media.mediaType]}
            </span>
          )}

          {media?.genres?.length > 0 && (
            <GenresBadgesList
              genres={media.genres.map((g) => ({
                id: g,
                name: genresOptions[g]
              }))}
            />
          )}

          {media?.keyWord && (
            <span className='text-xs px-1.5 py-0.5 border rounded-xs border-base-300'>
              {media.keyWord}
            </span>
          )}

          {enrichedServices.length > 0 && (
            <StreamingBadgesList services={enrichedServices} />
          )}
        </>
      )}

      {children}
    </article>
  );
};

export default SessionCard;
