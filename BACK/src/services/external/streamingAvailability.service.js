import client from '../../config/streamingAvailability';

//ONLY USED FOR APP STARTPAGE IN FRONT, FRONT WILL CHOOSE SERVICE, SIMPLE FOR VISUAL ONLY, SEE CONTROLLER IMPLEMENTATION FOR FULL USE
const getTopShowsImgsAndIds = async (service, country) => {
  const data = await client.showsApi.getTopShows({
    country,
    service
  });

  return data.map((show) => ({
    id: show.id,
    imageSet: {
      verticalPoster: show.imageSet.verticalPoster?.w720,
      horizontalPoster: show.imageSet.horizontalPoster?.w720,
      verticalBackdrop: show.imageSet.verticalBackdrop?.w720,
      horizontalBackdrop: show.imageSet.horizontalBackdrop?.w720
    }
  }));
};

getShows = ({ countryCode, languageCode, showType, genres, catalogs }) => {
  // popularity 1week
};

const streamingAvailabilityService = { getTopShowsImgsAndIds };

export default streamingAvailabilityService;
