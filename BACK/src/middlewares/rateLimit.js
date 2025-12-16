import limit from 'express-rate-limit';

// https://express-rate-limit.mintlify.app/quickstart/usage

const rateLimiter = (amount) =>
  limit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: amount, // requests per IP
    standardHeaders: true,
    legacyHeaders: false
  });

const general = rateLimiter(500);

const strict = rateLimiter(20);

const rateLimit = { general, strict };
export default rateLimit;
