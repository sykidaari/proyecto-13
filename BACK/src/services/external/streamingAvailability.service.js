import client from '../../config/streamingAvailability.js';

//ONLY USED FOR APP STARTPAGE IN FRONT, FRONT WILL CHOOSE SERVICE, SIMPLE FOR VISUAL ONLY, SEE CONTROLLER IMPLEMENTATION FOR FULL USE
const getTopShowsImgsAndIds = async (service, country) => {
  const shows = await client.showsApi.getTopShows({
    country,
    service
  });

  return shows.map((show) => ({
    id: show.id,
    imageSet: {
      verticalPoster: show.imageSet.verticalPoster?.w720,
      horizontalPoster: show.imageSet.horizontalPoster?.w720,
      verticalBackdrop: show.imageSet.verticalBackdrop?.w720,
      horizontalBackdrop: show.imageSet.horizontalBackdrop?.w720
    }
  }));
};

const getShows = async ({
  countryCode,
  languageCode,
  showType,
  genres,
  services: catalogs,
  keyWord,
  cursor
}) => {
  const { shows, ...paginationData } =
    await client.showsApi.searchShowsByFilters({
      country: countryCode,
      outputLanguage: languageCode,
      orderBy: 'popularity_1week',
      ...(showType && { showType }),
      ...(genres && { genres }),
      ...(catalogs && { catalogs }),
      ...(keyWord && { keyWord }),
      ...(cursor && { cursor })
    });

  return {
    shows: shows.map((show) => ({ id: show.id, showType: show.showType })),
    ...paginationData
  };
};

const streamingAvailabilityService = { getTopShowsImgsAndIds, getShows };

export default streamingAvailabilityService;
