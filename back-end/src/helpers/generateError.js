const generateError = (obj) => {
  const error = new Error();
  return {
    ...obj, stack: error,
  };
};

module.exports = generateError;