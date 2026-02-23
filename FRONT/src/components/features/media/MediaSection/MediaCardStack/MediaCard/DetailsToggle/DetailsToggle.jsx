import {
  InformationCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

const DetailsToggle = ({ onChange }) => {
  return (
    <div className='size-fit rounded-full glass bg-base-100/50 absolute top-2.5 mobile:top-5 right-2.5 mobile:right-5 max-compact:top-0.5 max-compact:right-0.5 z-100 '>
      <label className='swap swap-rotate btn btn-circle btn-ghost'>
        <input type='checkbox' onChange={onChange} />

        <XCircleIcon className='size-10 swap-on' />
        <InformationCircleIcon className='size-10 swap-off' />
      </label>
    </div>
  );
};

export default DetailsToggle;
