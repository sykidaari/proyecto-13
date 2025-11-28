import {
  addItemToUserChildList,
  getUserChild,
  removeItemFromUserChildList
} from '../userChildren.controller.js';

//* GET
export const getFavorites = getUserChild({ populateFields: ['medias'] });

//* PATCH
export const addGenreToFavorites = addItemToUserChildList('genres', 'genre');
export const removeGenreFromFavorites = removeItemFromUserChildList(
  'genres',
  'genre'
);
export const addMediaToFavorites = addItemToUserChildList('medias', 'mediaId');
export const removeMediaFromFavorites = removeItemFromUserChildList(
  'medias',
  'mediaId'
);
