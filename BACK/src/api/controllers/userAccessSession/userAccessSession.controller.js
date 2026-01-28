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
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) return res.sendStatus(401);

  const tokenHash = hashRefreshToken(refreshToken);
  try {
    const session = await UserAccessSession.findOneAndDelete({
      tokenHash
    }).lean();

    if (!session) return res.sendStatus(401);

    const newRefreshToken = generateRefreshToken();
    const newRefreshTokenHash = hashRefreshToken(newRefreshToken);

    const expiresAt = session.persistent
      ? new Date(Date.now() + rememberTtl)
      : new Date(session.expiresAt);

    await UserAccessSession.create({
      user: session.user,
      tokenHash: newRefreshTokenHash,

      expiresAt,
      persistent: session.persistent
    });

    setRefreshCookie(
      res,
      newRefreshToken,
      session.persistent ? rememberTtl : undefined
    );

    const accessToken = generateAccessToken(session.user);

    return res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};
