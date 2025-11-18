const errorHandler = (err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message;

  // Duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    status = 409;
    message = `${field} already exists`;
  }

  // Invalid ObjectId
  if (err.name === 'CastError') {
    status = 400;
    message = 'Invalid ID format';
  }

  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    status = 400;
    message = Object.values(err.errors)[0].message;
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    status = 401;
    message = 'Invalid token';
  }

  if (err.name === 'TokenExpiredError') {
    status = 401;
    message = 'Token expired';
  }

  // Multer (file upload)
  if (err.code === 'LIMIT_FILE_SIZE') {
    status = 400;
    message = 'File too large';
  }

  console.error('Method:', req.method);
  console.error('URL:', req.originalUrl);
  console.error('User:', req.user ? req.user._id : 'Not authenticated');
  console.error('Status:', status);
  console.error('Message:', message);

  res.status(status).json({
    error: message,
    status,
    path: req.originalUrl,
    method: req.method
  });
};

export default errorHandler;
