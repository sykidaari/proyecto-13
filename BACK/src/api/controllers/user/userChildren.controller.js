import { listContainsValue } from '../../../utils/controllerUtils.js';

//* GENERIC CONTROLLERS FOR USER CHILDREN

//* GET

export const getUserChild =
  ({ populateFields = [] } = {}) =>
  async (req, res, next) => {
    const { doc, status } = req;
    try {
      for (const field of populateFields) {
        await doc.populate(field);
        // each field can be either a string or an object, mongoose populate allows it
        // https://mongoosejs.com/docs/populate.html
      }

      const docObject = doc.toObject();

      return res.status(status).json(docObject);
    } catch (err) {
      next(err);
    }
  };

//* PATCH

export const addItemToUserChildList =
  (field, item) => async (req, res, next) => {
    const { doc, status, body } = req;
    const list = doc[field];
    const value = body[item];

    if (listContainsValue(list, value))
      throw customError(409, `${item}:${value} already in ${field}`);

    list.push(value);

    try {
      await doc.save();

      return res.status(status).json({
        message: `${item}:${value} added to ${field}`,
        [field]: list
      });
    } catch (err) {
      next(err);
    }
  };

export const removeItemFromUserChildList =
  (field, item) => async (req, res, next) => {
    const { doc, status, body } = req;
    let list = doc[field];
    const value = body[item];

    if (!listContainsValue(list, value))
      throw customError(
        400,
        `${item}:${value} doesn't exist in ${field},so it can't be removed`
      );

    list.pull(value);

    try {
      await doc.save();

      return res.status(status).json({
        message: `${item}:${value} removed from ${field}`,
        [field]: list
      });
    } catch (err) {
      next(err);
    }
  };
