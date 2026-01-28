import { Link } from 'react-router-dom';

export const AuthSwitchNav = ({ text, linkText, to }) => {
  return (
    <nav>
      <p>
        {text}{' '}
        <Link to={to} className='link link-primary'>
          {linkText}
        </Link>
      </p>
    </nav>
  );
};
