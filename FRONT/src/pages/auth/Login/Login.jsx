import R from '@/constants/client/routePaths.js';
import useText from '@/contexts/App/hooks/useText.js';
import LoginForm from '@/pages/auth/Login/LoginForm/LoginForm.jsx';
import RememberedUsers from '@/pages/auth/Login/RememberedUsers/RememberedUsers.jsx';
import { useRememberedUsers } from '@/pages/auth/Login/RememberedUsers/hooks.js';
import { useLoginViews } from '@/pages/auth/Login/hooks.js';
import { AuthSwitchNav } from '@c/layouts/AuthLayout/AuthSwitchNav/AuthSwitchNav.jsx';

const Login = () => {
  const { text, linkText } = useText('pages.auth.login.switchNav');

  const { users, selectedUser, forgetUser, selectUser } = useRememberedUsers();
  const { view, goToLogin } = useLoginViews(users);

  return (
    <>
      {view === 'remembered' ? (
        <RememberedUsers
          users={users}
          onClose={goToLogin}
          onForget={(u) => {
            forgetUser(u);
            if (users.length - 1 <= 0) goToLogin();
          }}
          onSelectUser={(u) => {
            selectUser(u);
            goToLogin();
          }}
        />
      ) : (
        <LoginForm selectedUser={selectedUser} />
      )}

      <AuthSwitchNav text={text} linkText={linkText} to={R.auth.register.abs} />
    </>
  );
};

export default Login;
