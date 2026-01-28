import useText from '@/contexts/App/hooks/useText.js';
import ErrorMessage from '@c/ui/ErrorMessage/ErrorMessage.jsx';
import React from 'react';

const ServerProblem = ({ className }) => {
  const t = useText('ui.error.serverProblem');

  return <ErrorMessage text={t} className={className} />;
};

export default ServerProblem;
