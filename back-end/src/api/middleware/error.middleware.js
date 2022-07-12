const error = (err, req, res, _next) => {
  console.log(err);
  if (err.message) {
    res.status(err.status || 500).json({ message: err.message });
  }
  return res.status(500).json({ message: 'error interno' });
};

module.exports = error;