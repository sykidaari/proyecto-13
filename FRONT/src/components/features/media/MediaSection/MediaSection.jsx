import MediaCard from '@c/features/media/MediaSection/MediaCardStack/MediaCard/MediaCard.jsx';
import MediaCardStack from '@c/features/media/MediaSection/MediaCardStack/MediaCardStack.jsx';

const MediaSection = ({ shows, swipeDirection, specifyShowType = false }) => {
  return (
    <section className=' bg-base-200 h-full w-full rounded-box p-2.5 mobile:p-5  min-[450px]:px-[7dvw] min-[501px]:max-mobile:px-[12dvw]'>
      <MediaCardStack
        medias={shows}
        direction={swipeDirection}
        renderCard={(media) => (
          <MediaCard media={media} specifyShowType={specifyShowType} />
        )}
      />
    </section>
  );
};

export default MediaSection;
