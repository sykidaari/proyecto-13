import useText from '@/contexts/App/hooks/useText';
import useRequests from '@/hooks/user/currentUser/useRequests';
import ListBox from '@c/ui/containers/ListBox/ListBox';

const ReceivedSessionRequestsSection = ({ secondary = false }) => {
  const {
    sessions: { title: titleText },
    noRequests: noItemsText
  } = useText('features.user.currentUser.receivedRequests');

  const { data, isPending, isError, isSuccess } = useRequests();

  console.log(data);

  return (
    <ListBox secondary title={titleText} noItemsText={noItemsText}>
      ReceivedSessionRequestsSection
    </ListBox>
  );
};

export default ReceivedSessionRequestsSection;
