import ERR from '../../../constants/errorCodes.js';
import OK from '../../../constants/successCodes.js';
import { customError, resolvePath } from '../../../utils/controllerUtils.js';

//* GENERIC CONTROLLERS FOR USER CHILDREN

//* GET

export const getUserChild =
  ({ populateFields = [] } = {}) =>
  async (req, res, next) => {
    const { doc, status } = req;
    try {
      for (const field of populateFields) {
        await doc.populate(field);
      }

      const docObject = doc.toObject();

      return res.status(status).json(docObject);
    } catch (err) {
      next(err);
    }
  };

//* PATCH

export const addItemToUserChildList =
  (field, itemKey) => async (req, res, next) => {
    const { doc, status, body } = req;
    const list = resolvePath(doc, field);
    const value = body[itemKey];

    const isObjectList = typeof list[0] === 'object';

    const exists = isObjectList
      ? list.some((entry) => entry[itemKey]?.toString() === value.toString())
      : list.some((entry) => entry.toString() === value.toString());

    if (exists)
      throw customError(409, ERR.userChild.conflict.alreadyExists, {
        field,
        [itemKey]: value
      });

    const item = isObjectList ? { [itemKey]: value } : value;

    list.push(item);

    try {
      await doc.save();

      return res.status(status).json({
        message: OK.userChild.itemAdded,
        [itemKey]: value,
        field,
        item
      });
    } catch (err) {
      next(err);
    }
  };

export const removeItemFromUserChildList =
  (field, itemKey) => async (req, res, next) => {
    const { doc, status, body } = req;
    const list = resolvePath(doc, field);
    const value = body[itemKey];

    const isObjectList = typeof list[0] === 'object';

    const index = isObjectList
      ? (index = list.findIndex(
          (entry) => entry[itemKey]?.toString() === value.toString()
        ))
      : (index = list.findIndex(
          (entry) => entry.toString() === value.toString()
        ));

    const notFound = index === -1;
    if (notFound)
      throw customError(400, ERR.userChild.invalid.notInList, {
        field,
        [itemKey]: value
      });

    const item = list.splice(index, 1)[0];

    try {
      await doc.save();

      return res.status(status).json({
        message: OK.userChild.itemRemoved,
        [itemKey]: value,
        field,
        item
      });
    } catch (err) {
      next(err);
    }
  };

//! NEEDS [requireSelf] SO EVEN IF ADMIN CHECKS REQS, THIS DOESN'T FIRE EVEN IF FRONT TRIES TO
export const markItemAsSeen = (field, itemIdKey) => async (req, res, next) => {
  const { doc, status, body } = req;
  const list = resolvePath(doc, field);
  const targetId = body[itemIdKey];

  try {
    const item = list.find(
      (entry) => entry[itemIdKey].toString() === targetId.toString()
    );
    if (!item) throw customError(404, ERR.userChild.notFound.item);

    const id = item[itemIdKey];

    item.isNewItem = false;

    await doc.save();

    return res.status(status).json({
      message: OK.userChild.itemMarkedSeen,
      id,
      item
    });
  } catch (err) {
    next(err);
  }
};

//! NEEDS [requireSelf] SO EVEN IF ADMIN CHECKS REQS, THIS DOESN'T FIRE EVEN IF FRONT TRIES TO
export const markAllItemsAsSeen = (field) => async (req, res, next) => {
  const { doc, status } = req;
  const list = resolvePath(doc, field);

  for (const item of list) {
    item.isNewItem = false;
  }

  try {
    await doc.save();

    return res.status(status).json({
      message: OK.userChild.allMarkedSeen,
      field,
      list
    });
  } catch (err) {
    next(err);
  }
};
