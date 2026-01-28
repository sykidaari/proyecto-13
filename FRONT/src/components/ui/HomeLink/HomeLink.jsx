import R from '@/constants/client/routePaths.js';
import AppLogo from '@c/ui/AppLogo/AppLogo.jsx';
import React from 'react';
import { Link } from 'react-router-dom';

const HomeLink = ({ withText }) => {
  return (
    <Link to={R.public.landing.abs}>
      <AppLogo withText={withText} />
    </Link>
  );
};

export default HomeLink;
