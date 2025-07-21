const handleHttpError = (err, req, res, next) => {
  console.error('Error:', err);

  const status = err.status || 500;
  const message = err.message || 'Error interno del servidor';

  res.status(status).json({
    message,
    ...(err.errors && { errors: err.errors }), 
  });
};

module.exports = { handleHttpError };
