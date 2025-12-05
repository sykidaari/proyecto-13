import ERR from '../constants/errorCodes.js';

const errorHandler = (err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message;
  // Duplicate key

  let field = err.field || null;

  if (err.code === 11000) {
    field = Object.keys(err.keyValue)[0];
    status = 409;
    message = ERR.system.duplicateValue;
  }

  // Invalid ObjectId
  if (err.name === 'CastError') {
    status = 400;
    message = ERR.system.invalidIdFormat;
  }

  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    status = 400;
    message = Object.values(err.errors)[0].message;
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    status = 401;
    message = ERR.system.jwtInvalid;
  }

  if (err.name === 'TokenExpiredError') {
    status = 401;
    message = ERR.system.jwtExpired;
  }

  // Multer (file upload)
  if (err.code === 'LIMIT_FILE_SIZE') {
    status = 400;
    message = ERR.system.fileTooLarge;
  }

  console.error('Method:', req.method);
  console.error('URL:', req.originalUrl);
  console.error('User:', req.user ? req.user._id : 'Not authenticated');
  console.error('Status:', status);
  console.error('Message:', message);
  console.error(err);

  const response = {
    ok: false,
    error: message,
    status,
    path: req.originalUrl,
    method: req.method
  };

  // custom error data
  for (const [key, value] of Object.entries(err)) {
    if (!['message', 'status', 'stack'].includes(key)) {
      response[key] = value;
    }
  }

  if (field) response.field = field;

  res.status(status).json(response);
};

export default errorHandler;
