import {
  addItemToUserChildList,
  getUserChild,
  removeItemFromUserChildList
} from '../userChildren.controller.js';

//* GET

export const getWatchList = getUserChild({ populateFields: 'medias' });

//* PATCH

export const addMediaToWatchList = addItemToUserChildList('medias', 'mediaId');

export const removeMediaFromWatchList = removeItemFromUserChildList(
  'medias',
  'mediaId'
);
