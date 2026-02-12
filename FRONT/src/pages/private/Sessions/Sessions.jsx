import UsersSearch from '@/pages/private/Sessions/UsersSearch/UsersSearch.jsx';
import FullLengthPageWrapper from '@c/layouts/PrivateLayout/FullLengthPageWrapper/FullLengthPageWrapper.jsx';

const Sessions = () => {
  return (
    <FullLengthPageWrapper className='pt-2.5'>
      <UsersSearch />
    </FullLengthPageWrapper>
  );
};

export default Sessions;
