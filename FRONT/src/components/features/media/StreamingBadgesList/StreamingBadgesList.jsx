import cN from '@/utils/classNameManager';

const StreamingBadgesList = ({ services, onClick, className }) => {
  if (!services) return null;

  return (
    <ul className='flex flex-wrap gap-1'>
      {services.map((s) => {
        const isLink = !!s.mediaLink;
        const isClickable = !!onClick;

        const Tag = isLink ? 'a' : isClickable ? 'button' : 'span';

        return (
          <li key={s.id} className='relative'>
            <Tag
              {...(isLink
                ? {
                    href: s.mediaLink,
                    target: '_blank',
                    rel: 'noopener noreferrer'
                  }
                : isClickable
                  ? {
                      type: 'button',
                      onClick: () => onClick(s.id)
                    }
                  : {})}
              className={cN(
                'relative badge bg-neutral',
                isClickable && 'cursor-pointer'
              )}
            >
              <div
                className='inset-0 absolute dark:opacity/50 rounded-box'
                style={{ backgroundColor: s.themeColor }}
              />
              <div
                className={cN(
                  'inset-0 absolute rounded-box',
                  typeof className === 'function' ? className(s.id) : className
                )}
              />

              <span
                className={cN(
                  'bg-primary-content dark:bg-primary-content/75 text-neutral badge badge-sm glass text-nowrap',
                  isLink && 'hover:underline'
                )}
              >
                {s.name}
              </span>
            </Tag>
          </li>
        );
      })}
    </ul>
  );
};

export default StreamingBadgesList;
