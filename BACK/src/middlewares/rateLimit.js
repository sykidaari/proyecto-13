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

// On free plan of RapidAp/Streaming Availability, I only have 1000 reqs
const streamingAvailabilityDemo = rateLimiter(
  process.env.NODE_ENV === 'development' ? 100 : 5
);

const rateLimit = { general, strict, streamingAvailabilityDemo };
export default rateLimit;
