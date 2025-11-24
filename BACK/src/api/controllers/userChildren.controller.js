import { listContainsValue } from '../../utils/controllerUtils.js';

//* GENERIC CONTROLLERS FOR USER CHILDREN

export const getUserChild = async (req, res, next) => {
  const { doc, status } = req;
  try {
    return res.status(status).json(doc);
  } catch (err) {
    next(err);
  }
};

export const addItemToUserChildList =
  (field, item) => async (req, res, next) => {
    const { doc, status, body } = req;
    const list = doc[field];
    const value = body[item];

    if (listContainsValue(list, value))
      return next(customError(409, `${item}:${value} already in ${field}`));

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
      return next(
        customError(
          400,
          `${item}:${value} doesn't exist in ${field},so it can't be removed`
        )
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
