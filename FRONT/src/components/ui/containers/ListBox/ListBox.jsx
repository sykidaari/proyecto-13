import SectionBox from '@c/ui/containers/SectionBox/SectionBox';
import ServerProblem from '@c/ui/ErrorMessage/ServerProblem/ServerProblem';

const ListBox = ({
  title,
  children,
  isLoading,
  isError,
  noItems,
  noItemsText,

  secondary = false
}) => {
  return (
    <SectionBox className={secondary && 'bg-base-300'}>
      <section className='w-full h-full flex flex-col min-h-20'>
        <div className='pb-2 m-auto'>
          <h3 className='badge badge-secondary badge-soft max-compact:badge-sm'>
            {title}
          </h3>
        </div>

        <div className='flex-1 bg-base-200 rounded-box relative flex justify-center items-center min-h-0'>
          {isLoading ? (
            <div className='skeleton size-full absolute' />
          ) : isError ? (
            <ServerProblem className='text-center' />
          ) : noItems ? (
            <p className='text-center text-info max-mobile:text-sm'>
              {noItemsText}
            </p>
          ) : (
            <ul className='size-full flex flex-col gap-2.5 p-1.5 mobile:p-2.5 items-center overflow-auto *:shrink-0'>
              {children}
            </ul>
          )}
        </div>
      </section>
    </SectionBox>
  );
};

export default ListBox;
