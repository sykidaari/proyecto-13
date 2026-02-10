import useServerProblemtext from '@/contexts/App/hooks/useServerProblemText.js';
import ErrorMessage from '@c/ui/ErrorMessage/ErrorMessage.jsx';
import React from 'react';

const ServerProblem = ({ className }) => {
  const t = useServerProblemtext();

  return <ErrorMessage text={t} className={className} />;
};

export default ServerProblem;
