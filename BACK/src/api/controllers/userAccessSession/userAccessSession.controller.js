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
    const newRefreshToken = generateRefreshToken();
    const newRefreshTokenHash = hashRefreshToken(newRefreshToken);

    const session = await UserAccessSession.findOne({ tokenHash });
    console.log('tokenHash:', tokenHash);
    console.log(session);

    if (!session) {
      console.log('session found: false');
      return res.sendStatus(401);
    }
    console.log('session found: true');
    console.log('persistent:', session.persistent);

    const expiresAt = session.persistent
      ? new Date(Date.now() + rememberTtl)
      : session.expiresAt;

    const updatedSession = await UserAccessSession.updateOne(
      { tokenHash },
      {
        tokenHash: newRefreshTokenHash,
        expiresAt
      },
      { new: true }
    );

    if (!updatedSession) {
      console.log('rotation failed - hash mismatch');
      return res.sendStatus(401);
    }

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
