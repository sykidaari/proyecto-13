import useAppContext from '@/contexts/App/hooks/useAppContext';
import useText from '@/contexts/App/hooks/useText';
import useKeywordPlaceholderText from '@/hooks/media/useKeywordPlaceholderText';
import cN from '@/utils/classNameManager';
import defaultFormConfig from '@/utils/defaultFormConfig';
import GenresBadgesList from '@c/features/media/GenresBadgesList/GenresBadgesList';
import { useEnrichedServices } from '@c/features/media/StreamingBadgesList/hooks';
import StreamingBadgesList from '@c/features/media/StreamingBadgesList/StreamingBadgesList';
import CountrySelect from '@c/ui/CountrySelect/CountrySelect';
import Fieldset from '@c/ui/form/Fieldset/Fieldset';
import Form from '@c/ui/form/Form/Form';
import Label from '@c/ui/form/Label/Label';
import SubmitButton from '@c/ui/form/SubmitButton/SubmitButton';
import TextField from '@c/ui/form/TextField/TextField';
import InfoToolTip from '@c/ui/InfoToolTip/InfoToolTip';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const SessionParameters = ({ onSubmit }) => {
  const {
    parameters: {
      title: titleText,
      name: { legend: nameLegendText },
      mediaType: { legend: mediaTypeLegendText, options: mediaTypeOptions },
      genres: {
        legend: genresLegendText,
        options: genresOptions,
        info: genresInfoText
      },
      keyword: { legend: keywordLegendText },
      services: { legend: servicesLegendText },
      country: { legend: countryLabelText, info: countryInfoText }
    },
    create: submitText
  } = useText('features.sessions.session');

  const { tooShort: tooShortText, tooLong: tooLongText } = useText(
    'features.user.userFormParts.names'
  );
  const keywordPlaceholderText = useKeywordPlaceholderText();

  const {
    state: { country: currentCountryCode }
  } = useAppContext();

  const [selectedMediaType, setSelectedMediaType] = useState('all');
  const [selectedGenres, setSelectedGenres] = useState(new Set());
  const [selectedServices, setSelectedServices] = useState(new Set());
  const [selectedCountry, setSelectedCountry] = useState(currentCountryCode);

  const enrichedServices = useEnrichedServices({
    countryCode: currentCountryCode,
    includeAll: true
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm(defaultFormConfig());

  return (
    <Form
      className='gap-2.5 pb-10 max-w-md'
      onSubmit={handleSubmit((data) => {
        const { sessionName, keyWord } = data || {};

        const finalData = {
          additionalPayload: {
            ...(sessionName?.trim() && { sessionName }),
            includedMedia: {
              ...(selectedMediaType !== 'all' && {
                mediaType: selectedMediaType
              }),
              ...(selectedGenres.size >= 1 && {
                genres: [...selectedGenres]
              }),
              ...(keyWord?.trim() && { keyWord }),

              ...(selectedServices.size >= 1 && {
                availability: {
                  services: [...selectedServices],
                  country: selectedCountry
                }
              })
            }
          }
        };

        onSubmit(finalData);
      })}
    >
      <h2 className='text-primary text-lg font-semibold'>{titleText}:</h2>
      <div className='w-full flex flex-col items-center gap-1.5'>
        <Fieldset legendText={nameLegendText} wide>
          <TextField
            error={errors?.sessionName?.message}
            {...register('sessionName', {
              minLength: {
                value: 3,
                message: tooShortText
              },
              maxLength: {
                value: 30,
                message: tooLongText
              }
            })}
          />
        </Fieldset>

        <Fieldset legendText={mediaTypeLegendText} asDiv wide>
          <ul className='flex gap-1 flex-wrap'>
            {Object.entries(mediaTypeOptions).map(([key, value]) => (
              <li key={key}>
                <button
                  type='button'
                  onClick={() => setSelectedMediaType(key)}
                  className={cN(
                    'font-semibold badge max-small:badge-sm cursor-pointer',
                    key === selectedMediaType && 'badge-secondary'
                  )}
                >
                  {value}
                </button>
              </li>
            ))}
          </ul>
        </Fieldset>

        <Fieldset asDiv legendText={genresLegendText} wide>
          <InfoToolTip
            text={genresInfoText}
            className='absolute right-2.5 -top-2.5 max-mobile:tooltip-left'
          />
          <GenresBadgesList
            genres={genresOptions}
            onClick={(genre) => {
              setSelectedGenres((prev) => {
                const next = new Set(prev);

                next.has(genre) ? next.delete(genre) : next.add(genre);
                return next;
              });
            }}
            className={(genre) =>
              cN(selectedGenres.has(genre) && 'badge-secondary')
            }
          />
        </Fieldset>

        <Fieldset legendText={keywordLegendText} wide>
          <TextField
            placeholder={keywordPlaceholderText}
            {...register('keyWord')}
          />
        </Fieldset>

        <Fieldset legendText={servicesLegendText} asDiv wide>
          <div className='flex flex-col gap-5'>
            <StreamingBadgesList
              services={enrichedServices}
              onClick={(service) => {
                setSelectedServices((prev) => {
                  const next = new Set(prev);

                  next.has(service) ? next.delete(service) : next.add(service);
                  return next;
                });
              }}
              className={(service) =>
                cN(
                  selectedServices.has(service) &&
                    'bg-secondary outline-base-content outline-2 brightness-150'
                )
              }
            />{' '}
            {selectedServices.size >= 1 && (
              <div className='flex gap-2.5 items-center'>
                <CountrySelect
                  text={countryLabelText}
                  onChange={setSelectedCountry}
                  defaultValue={currentCountryCode}
                />
                <InfoToolTip
                  className='min-w-6 min-h-6 max-mobile:tooltip-left pt-2.5'
                  text={countryInfoText}
                />
              </div>
            )}
          </div>
        </Fieldset>
      </div>
      <SubmitButton className='btn-primary'>{submitText}</SubmitButton>
    </Form>
  );
};

export default SessionParameters;
