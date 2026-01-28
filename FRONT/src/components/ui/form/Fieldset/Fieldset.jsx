const Fieldset = ({
  legendText,

  children
}) => {
  return (
    <fieldset className='fieldset bg-base-200 border-base-300 rounded-box w-full max-w-xs border p-4 relative'>
      <legend className='fieldset-legend'>{legendText}</legend>
      {children}
    </fieldset>
  );
};

export default Fieldset;
