const COUNTRIES_AND_SERVICES = [
  {
    countryCode: 'md',
    country: 'Moldova',
    services: ['netflix', 'prime', 'hbo', 'apple', 'mubi', 'zee5']
  },
  { countryCode: 'az', country: 'Azerbaijan', services: ['netflix'] },
  {
    countryCode: 'tr',
    country: 'Turkey',
    services: ['netflix', 'prime', 'disney', 'hbo', 'mubi', 'curiosity', 'zee5']
  },
  {
    countryCode: 'mk',
    country: 'North Macedonia',
    services: ['netflix', 'prime', 'disney', 'hbo', 'curiosity', 'zee5']
  },
  {
    countryCode: 'nz',
    country: 'New Zealand',
    services: [
      'netflix',
      'prime',
      'disney',
      'apple',
      'mubi',
      'curiosity',
      'tubi',
      'zee5'
    ]
  },
  {
    countryCode: 'jp',
    country: 'Japan',
    services: [
      'netflix',
      'prime',
      'disney',
      'apple',
      'mubi',
      'curiosity',
      'zee5'
    ]
  },
  {
    countryCode: 'hr',
    country: 'Croatia',
    services: ['netflix', 'prime', 'disney', 'hbo', 'mubi', 'curiosity', 'zee5']
  },
  {
    countryCode: 'pt',
    country: 'Portugal',
    services: [
      'netflix',
      'prime',
      'disney',
      'hbo',
      'apple',
      'curiosity',
      'zee5'
    ]
  },
  {
    countryCode: 'gr',
    country: 'Greece',
    services: [
      'netflix',
      'prime',
      'disney',
      'apple',
      'mubi',
      'curiosity',
      'zee5'
    ]
  },
  {
    countryCode: 'nl',
    country: 'Netherlands',
    services: [
      'netflix',
      'prime',
      'disney',
      'hbo',
      'apple',
      'mubi',
      'curiosity',
      'zee5'
    ]
  },
  {
    countryCode: 'th',
    country: 'Thailand',
    services: ['netflix', 'prime', 'hbo', 'apple', 'mubi', 'curiosity', 'zee5']
  },
  {
    countryCode: 'gb',
    country: 'United Kingdom',
    services: [
      'netflix',
      'prime',
      'disney',
      'apple',
      'iplayer',
      'itvx',
      'paramount',
      'mubi',
      'now',
      'all4',
      'curiosity',
      'discovery',
      'plutotv',
      'hotstar',
      'zee5'
    ]
  },
  {
    countryCode: 'id',
    country: 'Indonesia',
    services: ['netflix', 'prime', 'hbo', 'apple', 'mubi', 'curiosity', 'zee5']
  },
  {
    countryCode: 'ec',
    country: 'Ecuador',
    services: ['netflix', 'disney', 'hbo', 'paramount', 'tubi', 'zee5']
  },
  {
    countryCode: 'is',
    country: 'Iceland',
    services: ['netflix', 'prime', 'disney', 'curiosity', 'zee5']
  },
  {
    countryCode: 'vn',
    country: 'Vietnam',
    services: ['netflix', 'prime', 'apple', 'mubi', 'curiosity', 'zee5']
  },
  {
    countryCode: 'de',
    country: 'Germany',
    services: [
      'netflix',
      'prime',
      'disney',
      'apple',
      'paramount',
      'mubi',
      'curiosity',
      'wow',
      'discovery',
      'plutotv',
      'zee5'
    ]
  },
  {
    countryCode: 'hu',
    country: 'Hungary',
    services: [
      'netflix',
      'prime',
      'disney',
      'hbo',
      'apple',
      'mubi',
      'curiosity',
      'zee5'
    ]
  },
  { countryCode: 'sk', country: 'Slovakia', services: ['netflix'] },
  {
    countryCode: 'at',
    country: 'Austria',
    services: [
      'netflix',
      'prime',
      'disney',
      'apple',
      'paramount',
      'mubi',
      'curiosity',
      'discovery',
      'plutotv',
      'zee5'
    ]
  },
  {
    countryCode: 'ph',
    country: 'Philippines',
    services: [
      'netflix',
      'prime',
      'disney',
      'hbo',
      'apple',
      'mubi',
      'curiosity',
      'zee5'
    ]
  },
  {
    countryCode: 'kr',
    country: 'South Korea',
    services: [
      'netflix',
      'prime',
      'disney',
      'apple',
      'mubi',
      'curiosity',
      'zee5'
    ]
  },
  {
    countryCode: 'my',
    country: 'Malaysia',
    services: ['netflix', 'prime', 'hbo', 'apple', 'mubi', 'curiosity', 'zee5']
  },
  {
    countryCode: 'si',
    country: 'Slovenia',
    services: ['netflix', 'disney', 'hbo']
  },
  {
    countryCode: 'cz',
    country: 'Czech Republic',
    services: [
      'netflix',
      'prime',
      'disney',
      'hbo',
      'apple',
      'curiosity',
      'zee5'
    ]
  },
  {
    countryCode: 'us',
    country: 'United States',
    services: [
      'netflix',
      'prime',
      'disney',
      'hbo',
      'hulu',
      'apple',
      'peacock',
      'paramount',
      'starz',
      'mubi',
      'britbox',
      'curiosity',
      'discovery',
      'plutotv',
      'tubi',
      'zee5'
    ]
  },
  {
    countryCode: 'es',
    country: 'Spain',
    services: [
      'netflix',
      'prime',
      'disney',
      'hbo',
      'apple',
      'mubi',
      'curiosity',
      'plutotv',
      'zee5'
    ]
  },
  {
    countryCode: 'rs',
    country: 'Serbia',
    services: ['netflix', 'prime', 'disney', 'hbo', 'mubi', 'curiosity', 'zee5']
  },
  {
    countryCode: 'ro',
    country: 'Romania',
    services: ['netflix', 'prime', 'disney', 'hbo', 'mubi', 'curiosity', 'zee5']
  },
  {
    countryCode: 'pa',
    country: 'Panama',
    services: [
      'netflix',
      'prime',
      'disney',
      'hbo',
      'apple',
      'paramount',
      'mubi',
      'curiosity',
      'plutotv',
      'tubi',
      'zee5'
    ]
  },
  {
    countryCode: 'ae',
    country: 'United Emirates',
    services: ['netflix', 'prime', 'apple', 'mubi', 'curiosity', 'zee5']
  },
  {
    countryCode: 'il',
    country: 'Israel',
    services: ['netflix', 'prime', 'apple', 'mubi', 'curiosity', 'zee5']
  },
  {
    countryCode: 'it',
    country: 'Italy',
    services: [
      'netflix',
      'prime',
      'disney',
      'apple',
      'paramount',
      'mubi',
      'now',
      'curiosity',
      'discovery',
      'plutotv',
      'zee5'
    ]
  },
  {
    countryCode: 'fi',
    country: 'Finland',
    services: [
      'netflix',
      'prime',
      'disney',
      'hbo',
      'apple',
      'mubi',
      'curiosity',
      'zee5'
    ]
  },
  {
    countryCode: 'cy',
    country: 'Cyprus',
    services: ['netflix', 'prime', 'apple', 'mubi', 'curiosity', 'zee5']
  },
  {
    countryCode: 'ch',
    country: 'Switzerland',
    services: [
      'netflix',
      'prime',
      'disney',
      'apple',
      'paramount',
      'mubi',
      'curiosity',
      'plutotv',
      'zee5'
    ]
  },
  {
    countryCode: 'pl',
    country: 'Poland',
    services: [
      'netflix',
      'prime',
      'disney',
      'hbo',
      'apple',
      'mubi',
      'curiosity',
      'zee5'
    ]
  },
  {
    countryCode: 'ie',
    country: 'Ireland',
    services: [
      'netflix',
      'prime',
      'disney',
      'apple',
      'paramount',
      'mubi',
      'now',
      'all4',
      'curiosity',
      'discovery',
      'plutotv',
      'zee5'
    ]
  },
  {
    countryCode: 'dk',
    country: 'Denmark',
    services: [
      'netflix',
      'prime',
      'disney',
      'hbo',
      'apple',
      'mubi',
      'curiosity',
      'plutotv',
      'zee5'
    ]
  },
  {
    countryCode: 'ar',
    country: 'Argentina',
    services: [
      'netflix',
      'prime',
      'disney',
      'hbo',
      'apple',
      'paramount',
      'mubi',
      'curiosity',
      'plutotv',
      'zee5'
    ]
  },
  {
    countryCode: 'br',
    country: 'Brazil',
    services: [
      'netflix',
      'prime',
      'disney',
      'hbo',
      'apple',
      'paramount',
      'mubi',
      'curiosity',
      'plutotv',
      'zee5'
    ]
  },
  {
    countryCode: 'ee',
    country: 'Estonia',
    services: ['netflix', 'disney', 'apple', 'mubi', 'curiosity', 'zee5']
  },
  {
    countryCode: 'hk',
    country: 'Hong Kong',
    services: [
      'netflix',
      'prime',
      'disney',
      'hbo',
      'apple',
      'mubi',
      'curiosity',
      'zee5'
    ]
  },
  {
    countryCode: 'pe',
    country: 'Peru',
    services: ['netflix', 'disney', 'hbo', 'paramount']
  },
  {
    countryCode: 'co',
    country: 'Colombia',
    services: [
      'netflix',
      'prime',
      'disney',
      'hbo',
      'apple',
      'paramount',
      'mubi',
      'curiosity',
      'plutotv',
      'zee5'
    ]
  },
  {
    countryCode: 'za',
    country: 'South Africa',
    services: [
      'netflix',
      'prime',
      'apple',
      'mubi',
      'britbox',
      'curiosity',
      'zee5'
    ]
  },
  {
    countryCode: 'ca',
    country: 'Canada',
    services: [
      'netflix',
      'prime',
      'disney',
      'apple',
      'crave',
      'paramount',
      'mubi',
      'britbox',
      'curiosity',
      'discovery',
      'plutotv',
      'tubi',
      'hotstar',
      'zee5'
    ]
  },
  {
    countryCode: 'be',
    country: 'Belgium',
    services: [
      'netflix',
      'prime',
      'disney',
      'hbo',
      'apple',
      'mubi',
      'curiosity',
      'zee5'
    ]
  },
  {
    countryCode: 'in',
    country: 'India',
    services: [
      'netflix',
      'prime',
      'apple',
      'hotstar',
      'zee5',
      'sonyliv',
      'mubi',
      'curiosity'
    ]
  },
  { countryCode: 'ru', country: 'Russia', services: ['zee5'] },
  {
    countryCode: 'se',
    country: 'Sweden',
    services: [
      'netflix',
      'prime',
      'disney',
      'hbo',
      'apple',
      'mubi',
      'curiosity',
      'plutotv',
      'zee5'
    ]
  },
  {
    countryCode: 'fr',
    country: 'France',
    services: [
      'netflix',
      'prime',
      'disney',
      'hbo',
      'apple',
      'paramount',
      'mubi',
      'curiosity',
      'plutotv',
      'zee5'
    ]
  },
  {
    countryCode: 'au',
    country: 'Australia',
    services: [
      'netflix',
      'prime',
      'disney',
      'hbo',
      'apple',
      'stan',
      'paramount',
      'mubi',
      'britbox',
      'curiosity',
      'tubi',
      'zee5'
    ]
  },
  {
    countryCode: 'bg',
    country: 'Bulgaria',
    services: [
      'netflix',
      'prime',
      'disney',
      'hbo',
      'apple',
      'mubi',
      'curiosity',
      'zee5'
    ]
  },
  {
    countryCode: 'mx',
    country: 'Mexico',
    services: [
      'netflix',
      'prime',
      'disney',
      'hbo',
      'apple',
      'paramount',
      'mubi',
      'curiosity',
      'plutotv',
      'tubi',
      'zee5'
    ]
  },
  {
    countryCode: 'cl',
    country: 'Chile',
    services: [
      'netflix',
      'prime',
      'disney',
      'hbo',
      'apple',
      'paramount',
      'mubi',
      'curiosity',
      'plutotv',
      'zee5'
    ]
  },
  {
    countryCode: 'sg',
    country: 'Singapore',
    services: [
      'netflix',
      'prime',
      'disney',
      'hbo',
      'apple',
      'mubi',
      'curiosity',
      'hotstar',
      'zee5'
    ]
  },
  {
    countryCode: 'ua',
    country: 'Ukraine',
    services: ['netflix', 'prime', 'apple', 'mubi', 'curiosity', 'zee5']
  },
  {
    countryCode: 'no',
    country: 'Norway',
    services: [
      'netflix',
      'prime',
      'disney',
      'hbo',
      'apple',
      'mubi',
      'curiosity',
      'plutotv',
      'zee5'
    ]
  },
  {
    countryCode: 'lt',
    country: 'Lithuania',
    services: [
      'netflix',
      'prime',
      'disney',
      'apple',
      'mubi',
      'curiosity',
      'zee5'
    ]
  }
];

export default COUNTRIES_AND_SERVICES;
