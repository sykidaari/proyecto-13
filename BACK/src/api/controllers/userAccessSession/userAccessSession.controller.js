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
  const now = new Date().toISOString();

  console.log(`[REFRESH START] ${now} id=${requestId}`);

  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    console.log(`[REFRESH 401 NO COOKIE] id=${requestId}`);
    return res.sendStatus(401);
  }

  const tokenHash = hashRefreshToken(refreshToken);

  try {
    const session = await UserAccessSession.findOne({ tokenHash }).lean();

    if (!session) {
      console.log(`[REFRESH 401 NO SESSION] id=${requestId} hash=${tokenHash}`);
      return res.sendStatus(401);
    }

    const newRefreshToken = generateRefreshToken();
    const newRefreshTokenHash = hashRefreshToken(newRefreshToken);

    const expiresAt = session.persistent
      ? new Date(Date.now() + rememberTtl)
      : session.expiresAt;

    const rotated = await UserAccessSession.findOneAndUpdate(
      { tokenHash },
      { tokenHash: newRefreshTokenHash, expiresAt },
      { returnDocument: 'after' }
    );

    if (!rotated) {
      console.log(
        `[REFRESH 401 ROTATION LOST] id=${requestId} hash=${tokenHash}`
      );
      return res.sendStatus(401);
    }

    setRefreshCookie(
      res,
      newRefreshToken,
      session.persistent ? rememberTtl : undefined
    );

    const accessToken = generateAccessToken(session.user);

    console.log(`[REFRESH SUCCESS] id=${requestId}`);
    return res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};
