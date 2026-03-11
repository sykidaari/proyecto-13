import useText from '@/contexts/App/hooks/useText';
import useSessionsList from '@/hooks/user/currentUser/useSessionsList';
import SessionCard from '@c/features/sessions/session/SessionCard/SessionCard';
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
          {console.log(item.session)}
          <SessionCard sessionParameters={item.session}>
            <ul>
              {item.participants?.map((item) => (
                <li key={item._id}>{item?.user?.userName} </li>
              ))}
            </ul>
          </SessionCard>
        </ListBoxItem>
      ))}
    </ListBox>
  );
};

export default SessionsSection;
