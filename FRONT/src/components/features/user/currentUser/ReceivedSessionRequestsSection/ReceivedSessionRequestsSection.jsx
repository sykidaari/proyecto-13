import useText from '@/contexts/App/hooks/useText';
import useRequests from '@/hooks/user/currentUser/useRequests';
import ListBox from '@c/ui/containers/ListBox/ListBox';

const ReceivedSessionRequestsSection = ({ secondary = false }) => {
  const {
    sessions: { title: titleText },
    noRequests: noItemsText
  } = useText('features.user.currentUser.receivedRequests');

  const { data, isPending, isError } = useRequests();

  const requests = data?.sessions?.received;

  return (
    <ListBox
      secondary={secondary}
      title={titleText}
      noItemsText={noItemsText}
      noItems={!requests || !requests.length}
    ></ListBox>
  );
};

export default ReceivedSessionRequestsSection;
