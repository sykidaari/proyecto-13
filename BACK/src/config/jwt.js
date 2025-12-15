import jsonwebtoken from 'jsonwebtoken';
const { sign, verify } = jsonwebtoken;

export const generateToken = (userId) => {
  return sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token) => {
  return verify(token, process.env.JWT_SECRET);
};
