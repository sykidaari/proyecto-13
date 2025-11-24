import { getUserChild } from '../../userChildren.controller.js';

//* GET
export const getFriends = getUserChild;

//* PATCH
export const acceptFriendRequest = async (req, res, next) => {};

export const rejectFriendRequest = async (req, res, next) => {};

export const removeFriend = async (req, res, next) => {};
