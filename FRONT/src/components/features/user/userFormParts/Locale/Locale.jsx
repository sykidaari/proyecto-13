import COUNTRIES_AND_SERVICES from '@/constants/domain/countriesAndServices.js';
import LANGUAGES from '@/constants/domain/languages.js';
import useAppContext from '@/contexts/App/hooks/useAppContext.js';
import useText from '@/contexts/App/hooks/useText.js';
import defaultFormConfig from '@/utils/defaultFormConfig.js';
import Fieldset from '@c/ui/form/Fieldset/Fieldset.jsx';
import Form from '@c/ui/form/Form/Form.jsx';
import Label from '@c/ui/form/Label/Label.jsx';
import SubmitButton from '@c/ui/form/SubmitButton/SubmitButton.jsx';
import { useForm } from 'react-hook-form';

const Locale = ({ onNext, legendText, hasButton, buttonContent }) => {
  const {
    labels: { country: countryText, language: LanguageText }
  } = useText('features.user.userFormParts.locale');

  const {
    state: { language: currentLanguageCode, country: currentCountryCode },
    actions: { setLanguage, setCountry }
  } = useAppContext();

  const { register, handleSubmit } = useForm(
    defaultFormConfig({
      defaultValues: {
        country: currentCountryCode,
        language: currentLanguageCode
      }
    })
  );

  const handleLocaleSubmit = (data) => {
    onNext({
      countryCode: data.country,
      languageCode: data.language
    });
  };

  return (
    <Form onSubmit={handleSubmit(handleLocaleSubmit)}>
      <Fieldset legendText={legendText}>
        <Label>
          {LanguageText}
          <select
            className='select'
            {...register('language')}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {LANGUAGES.map(({ code, language }) => (
              <option key={code} value={code}>
                {language}
              </option>
            ))}
          </select>
        </Label>

        <Label>
          {countryText}
          <select
            className='select'
            {...register('country')}
            onChange={(e) => setCountry(e.target.value)}
          >
            {COUNTRIES_AND_SERVICES.map(({ countryCode, country }) => (
              <option key={countryCode} value={countryCode}>
                {country}
              </option>
            ))}
          </select>
        </Label>

        {hasButton && <SubmitButton>{buttonContent}</SubmitButton>}
      </Fieldset>
    </Form>
  );
};

export default Locale;
