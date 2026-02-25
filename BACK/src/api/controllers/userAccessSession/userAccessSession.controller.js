import mongoose from 'mongoose';
import {
  generateAccessToken,
  generateRefreshToken,
  hashRefreshToken
} from '../../../config/auth.js';
import {
  rememberTtl,
  setRefreshCookie
} from '../../../utils/controllerUtils.js';
import UserAccessSession from '../../models/userAccessSession/userAccessSession.model.js';

export const refreshAccessToken = async (req, res, next) => {
  const requestId = crypto.randomUUID();
  const now = new Date();

  console.log(`[REFRESH START] ${now.toISOString()} id=${requestId}`);

  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    console.log(`[REFRESH 401 NO COOKIE] id=${requestId}`);
    return res.sendStatus(401);
  }

  const tokenHash = hashRefreshToken(refreshToken);

  try {
    const session = await UserAccessSession.findOne({
      $or: [
        { tokenHash },
        {
          previousTokenHash: tokenHash,
          previousValidUntil: { $gt: now }
        }
      ]
    });

    if (!session) {
      console.log(`[REFRESH 401 NO SESSION] id=${requestId} hash=${tokenHash}`);
      return res.sendStatus(401);
    }

    const isUsingPrevious =
      session.previousTokenHash === tokenHash &&
      session.previousValidUntil > now;

    const expiresAt = session.persistent
      ? new Date(Date.now() + rememberTtl)
      : session.expiresAt;

    const graceWindowMs = 5000;

    let newRefreshToken;
    let newRefreshTokenHash;

    if (!isUsingPrevious) {
      newRefreshToken = generateRefreshToken();
      newRefreshTokenHash = hashRefreshToken(newRefreshToken);

      session.previousTokenHash = session.tokenHash;
      session.previousValidUntil = new Date(Date.now() + graceWindowMs);

      session.tokenHash = newRefreshTokenHash;
      session.expiresAt = expiresAt;

      await session.save();

      setRefreshCookie(
        res,
        newRefreshToken,
        session.persistent ? rememberTtl : undefined
      );
    }

    const accessToken = generateAccessToken(session.user);

    console.log(`[REFRESH SUCCESS] id=${requestId}`);
    return res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};
