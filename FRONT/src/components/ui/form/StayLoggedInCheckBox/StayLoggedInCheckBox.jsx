import useText from '@/contexts/App/hooks/useText.js';
import cN from '@/utils/classNameManager.js';

const StayLoggedInCheckBox = ({ checked, setChecked, className }) => {
  const t = useText('ui.form.fields.stayLoggedIn');

  return (
    <label className={cN('label', className)}>
      <input
        type='checkbox'
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        className='checkbox checkbox-secondary'
      />
      {t}
    </label>
  );
};

export default StayLoggedInCheckBox;
