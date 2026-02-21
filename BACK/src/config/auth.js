import jsonwebtoken from 'jsonwebtoken';
const { sign, verify } = jsonwebtoken;
import { createHash, randomBytes } from 'crypto';

export const generateAccessToken = (userId) =>
  sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1m' });

export const verifyAccessToken = (token) =>
  verify(token, process.env.JWT_SECRET);

export const generateRefreshToken = () => randomBytes(64).toString('hex');

export const hashRefreshToken = (token) =>
  createHash('sha256').update(token).digest('hex');
