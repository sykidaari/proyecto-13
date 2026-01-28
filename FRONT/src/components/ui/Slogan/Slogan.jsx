import useText from '@/contexts/App/hooks/useText.js';

const Slogan = () => {
  const slogan = useText('ui.slogan');
  return (
    <p>
      {slogan[1]} <span className='font-semibold'>{slogan[2]}</span>
    </p>
  );
};

export default Slogan;
