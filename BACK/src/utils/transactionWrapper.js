//* CAN BE NESTED!!! :D

import mongoose from 'mongoose';

const withTransaction = async (fn, session = null) => {
  // creates it's own session if no valid session has been passed to it
  const ownSession = !session;

  if (ownSession) {
    session = await mongoose.startSession();
    session.startTransaction();
  }

  try {
    const result = await fn(session);

    if (ownSession) {
      await session.commitTransaction();
    }

    return result;
  } catch (err) {
    if (ownSession) {
      await session.abortTransaction();
    }
    throw err;
  } finally {
    if (ownSession) {
      session.endSession();
    }
  }
};

export default withTransaction;
