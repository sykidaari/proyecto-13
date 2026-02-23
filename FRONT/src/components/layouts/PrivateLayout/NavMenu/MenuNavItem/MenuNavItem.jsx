import cN from '@/utils/classNameManager.js';
import React from 'react';
import { NavLink } from 'react-router-dom';

const MenuNavItem = ({ to, children, title, className }) => {
  return (
    <li className='tooltip' data-tip={title}>
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
