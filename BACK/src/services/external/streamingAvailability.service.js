import client from '../../config/streamingAvailability.js';

//ONLY USED FOR APP STARTPAGE IN FRONT, FRONT WILL CHOOSE SERVICE, SIMPLE FOR VISUAL ONLY, SEE CONTROLLER IMPLEMENTATION FOR FULL USE
const getTopShowsImgs = async (country, service) => {
  const shows = await client.showsApi.getTopShows({
    country,
    service
  });

  return shows.map((show) => ({
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
  keyword,
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
      ...(keyword && { keyword }),
      ...(cursor && { cursor })
    });

  return {
    shows: shows.map((show) => ({
      id: show.id,
      showType: show.showType,
      title: show.title,
      imageSet: {
        verticalPoster: show.imageSet.verticalPoster?.w720,
        horizontalPoster: show.imageSet.horizontalPoster?.w720,
        verticalBackdrop: show.imageSet.verticalBackdrop?.w720,
        horizontalBackdrop: show.imageSet.horizontalBackdrop?.w720
      },
      details: {
        releaseYear: show.releaseYear,
        overview: show.overview,
        genres: show.genres,
        rating: show.rating,
        directors: show.directors,
        creators: show.creators,
        cast: show.cast,
        runtime: show.runtime,
        seasonCount: show.seasonCount
      },
      streamingOptions: show.streamingOptions?.[countryCode]
        ? [
            {
              country: countryCode,
              services: show.streamingOptions[countryCode].map(
                (opt) => opt.service.id
              )
            }
          ]
        : []
    })),
    ...paginationData
  };
};

const streamingAvailabilityService = { getTopShowsImgs, getShows };

export default streamingAvailabilityService;
