const NotificationIndicator = () => {
  return (
    <div className='absolute inset-0 pointer-events-none'>
      <div className='absolute right-0 top-0 size-2.5 flex items-center justify-center'>
        <div className='rounded-full bg-info animate-ping size-2.5 absolute' />
        <div className='rounded-full bg-info size-2.5' />
      </div>
    </div>
  );
};

export default NotificationIndicator;
