import useText from '@/contexts/App/hooks/useText';
import useSessionsList from '@/hooks/user/currentUser/useSessionsList';
import ListBox from '@c/ui/containers/ListBox/ListBox';
import ListBoxItem from '@c/ui/containers/ListBox/ListBoxItem/ListBoxItem';

const SessionsSection = () => {
  const { noSessions: noSessionsText, title: titleText } = useText(
    'features.user.currentUser.sessionsSection'
  );

  const { data, isError, isPending } = useSessionsList();

  const sessions = data?.sessionsList;
  return (
    <ListBox
      title={titleText}
      noItems={!sessions || !sessions.length}
      noItemsText={noSessionsText}
      isError={isError}
      isLoading={isPending}
    >
      {sessions?.map((item) => (
        <ListBoxItem key={item._id}>
          {/* <h4 className='h-6'>{item.sessionParameters?.sessionName}</h4> */}
        </ListBoxItem>
      ))}
    </ListBox>
  );
};

export default SessionsSection;
