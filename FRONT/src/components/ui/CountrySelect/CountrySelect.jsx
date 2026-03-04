import COUNTRIES_AND_SERVICES from '@/constants/domain/countriesAndServices';
import Label from '@c/ui/form/Label/Label';

const CountrySelect = ({ text, onChange, defaultValue, ...props }) => {
  return (
    <Label>
      {text}
      <select
        className='select w-full'
        onChange={(e) => onChange(e)}
        defaultValue={defaultValue}
        {...props}
      >
        {COUNTRIES_AND_SERVICES.map(({ countryCode, country }) => (
          <option key={countryCode} value={countryCode}>
            {country}
          </option>
        ))}
      </select>
    </Label>
  );
};

export default CountrySelect;
