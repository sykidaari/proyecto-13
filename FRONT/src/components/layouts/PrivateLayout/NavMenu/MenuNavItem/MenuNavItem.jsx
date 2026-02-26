import cN from '@/utils/classNameManager.js';
import NotificationIndicator from '@c/ui/NotificationIndicator/NotificationIndicator';
import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const MenuNavItem = ({
  to,
  children,
  title,
  className,
  featured = false,
  notify = false
}) => {
  const [renderNotify, setRenderNotify] = useState(notify);

  useEffect(() => {
    setRenderNotify(notify);
  }, [notify]);

  const location = useLocation();
  const prevPath = useRef(location.pathname);
  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      setRenderNotify(false);
    }

    prevPath.current = location.pathname;
  }, [location.pathname]);

  return (
    <li
      className={cN('tooltip', featured && 'tooltip-secondary')}
      data-tip={title}
      onClick={() => setRenderNotify(false)}
    >
      {renderNotify && <NotificationIndicator />}
      <NavLink
        to={to}
        className={({ isActive }) =>
          cN(
            ' size-full *:size-8 *:object-contain text-primary border max-mini:*:size-7',
            isActive && 'bg-secondary',
            className
          )
        }
      >
        {children}
      </NavLink>
    </li>
  );
};

export default MenuNavItem;
