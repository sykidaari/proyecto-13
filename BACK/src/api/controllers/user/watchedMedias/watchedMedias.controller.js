import SE from '../../../../constants/socketEvents.js';
import { emitUserMediaUpdate } from '../../../../utils/controllerUtils.js';
import {
  addItemToUserChildList,
  getUserChild,
  removeItemFromUserChildList
} from '../userChildren.controller.js';

//* GET

export const getWatchedMedias = getUserChild();

//* PATCH

export const markMediaAsWatched = addItemToUserChildList(
  'medias',
  'mediaId',
  emitUserMediaUpdate(SE.sessions.participantsChanges.mediaWatchedUpdated)
);

export const markMediaAsUnwatched = removeItemFromUserChildList(
  'medias',
  'mediaId',
  emitUserMediaUpdate(SE.sessions.participantsChanges.mediaWatchedUpdated)
);
