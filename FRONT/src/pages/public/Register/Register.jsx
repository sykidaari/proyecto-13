import useText from '@/contexts/App/hooks/useText.js';
import { useMultiStepRegister } from '@/pages/public/Register/hooks.js';
import cN from '@/utils/classNameManager.js';
import Email from '@c/features/user/userFormParts/Email/Email.jsx';
import Img from '@c/features/user/userFormParts/Img/Img.jsx';
import Locale from '@c/features/user/userFormParts/Locale/Locale.jsx';
import Names from '@c/features/user/userFormParts/Names/Names.jsx';
import Password from '@c/features/user/userFormParts/Password/Password.jsx';
import StayLoggedInCheckBox from '@c/ui/form/StayLoggedInCheckBox/StayLoggedInCheckBox.jsx';

import { useState } from 'react';

//* LOGIN NOT FULLY FINISHED
const Register = () => {
  const {
    legends: {
      locale: localeLegend,
      email: emailLegend,
      names: namesLegend,
      password: passwordLegend,
      img: imgLegend
    },
    skipAndFinish: skipText,
    finish: finishText
  } = useText('pages.auth.register');

  const nextText = useText('features.user.userFormParts.next');

  const [step, setStep] = useState(1);
  const next = () => setStep((s) => s + 1);

  const [imageSelected, setImageSelected] = useState(false);
  const [stayLoggedInChecked, setStayLoggedInChecked] = useState(true);

  const [serverError, setServerError] = useState(null);

  const { saveStepData, submitAll, isSubmitting } = useMultiStepRegister(
    stayLoggedInChecked,
    setServerError
  );

  const handleStep = (data) => {
    saveStepData(data);
    next();
  };

  const sharedProps = {
    onNext: handleStep,
    hasButton: true,
    buttonContent: nextText
  };

  return (
    <div className='w-full flex flex-col items-center gap-5'>
      <ul className='steps'>
        {[1, 2, 3, 4, 5].map((i) => (
          <li key={i} className={cN('step', step >= i && 'step-primary')} />
        ))}
      </ul>

      {serverError && <p className='text-error text-sm mt-2'>{serverError}</p>}

      <div className='w-full'>
        {step === 1 && <Locale {...sharedProps} legendText={localeLegend} />}

        {step === 2 && <Email {...sharedProps} legendText={emailLegend} />}

        {step === 3 && <Names {...sharedProps} legendText={namesLegend} />}

        {step === 4 && (
          <Password {...sharedProps} legendText={passwordLegend} />
        )}

        {step === 5 && (
          <Img
            hasButton
            legendText={imgLegend}
            setSelected={setImageSelected}
            buttonContent={imageSelected ? finishText : skipText}
            onNext={submitAll}
            isSubmitting={isSubmitting}
          >
            <StayLoggedInCheckBox
              className='mt-10'
              checked={stayLoggedInChecked}
              setChecked={setStayLoggedInChecked}
            />
          </Img>
        )}
      </div>
    </div>
  );
};

export default Register;
