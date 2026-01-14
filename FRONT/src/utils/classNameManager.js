import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const cN = (...classNames) => twMerge(clsx(classNames));

export default cN;
