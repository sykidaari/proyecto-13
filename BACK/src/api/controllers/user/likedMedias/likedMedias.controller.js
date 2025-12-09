import SE from '../../../../constants/socketEvents.js';
import { emitUserMediaUpdate } from '../../../../utils/controllerUtils.js';
import {
  addItemToUserChildList,
  getUserChild,
  removeItemFromUserChildList
} from '../userChildren.controller.js';

//* GET

export const getLikedMedias = getUserChild();

//* PATCH

export const likeMedia = addItemToUserChildList(
  'medias',
  'mediaId',
  emitUserMediaUpdate(SE.sessions.participantsChanges.mediaLikeUpdated)
);

export const unlikeMedia = removeItemFromUserChildList(
  'medias',
  'mediaId',
  emitUserMediaUpdate(SE.sessions.participantsChanges.mediaLikeUpdated)
);
