import useServerProblemtext from '@/contexts/App/hooks/useServerProblemText';
import cN from '@/utils/classNameManager';
import React from 'react';

const LoadingButtonsSection = ({ isError, isLoading, children, className }) => {
  const errorMessage = useServerProblemtext();

  // children are meant to be plan buttons

  return (
    <section
      className={cN(
        'flex *:btn *:btn-soft *:mobile:flex-1 gap-1 max-mobile:flex-col relative',
        isError && 'tooltip tooltip-error *:btn-error',
        isLoading && '*:btn-disabled',
        className
      )}
      data-tip={errorMessage}
    >
      {children}
      {isLoading && (
        <div className='absolute inset-0 z-20 glass backdrop-blur-xs'>
          <span className='loading' />
        </div>
      )}
    </section>
  );
};

export default LoadingButtonsSection;
