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
  console.log('reached');

  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) return res.sendStatus(401);

  const tokenHash = hashRefreshToken(refreshToken);

  console.log('cookie token:', refreshToken);
  console.log('cookie hash:', tokenHash);

  try {
    const newRefreshToken = generateRefreshToken();
    const newRefreshTokenHash = hashRefreshToken(newRefreshToken);

    const session = await UserAccessSession.findOne({ tokenHash });

    console.log('session found:', !!session);

    if (!session) return res.sendStatus(401);

    const expiresAt = session.persistent
      ? new Date(Date.now() + rememberTtl)
      : session.expiresAt;

    await UserAccessSession.updateOne(
      { _id: session._id },
      {
        tokenHash: newRefreshTokenHash,
        expiresAt
      }
    );

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
