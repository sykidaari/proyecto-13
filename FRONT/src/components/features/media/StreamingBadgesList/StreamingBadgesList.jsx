const StreamingBadgesList = ({ services }) => (
  <ul className='flex flex-wrap gap-1'>
    {services.map((s) => (
      <li
        key={s.id}
        style={{ backgroundColor: s.themeColor }}
        className='badge bg-neutral'
      >
        <a
          className='bg-primary-content text-neutral badge badge-sm glass hover:underline text-nowrap'
          href={s.mediaLink}
          target='_blank'
          rel='noopener noreferrer'
        >
          {s.name}
        </a>
      </li>
    ))}
  </ul>
);

export default StreamingBadgesList;
