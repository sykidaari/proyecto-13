import jsonwebtoken from 'jsonwebtoken';
const { sign, verify } = jsonwebtoken;

export const generateToken = (id) => {
  return sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export const verifyToken = (token) => {
  return verify(token, process.env.JWT_SECRET);
};
