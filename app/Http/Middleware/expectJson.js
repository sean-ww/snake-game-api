const errors = require('restify-errors');

module.exports = (req, next) => {
  if (!req.is('application/json')) {
    return next(new errors.InvalidContentError("Expects 'application/json'"));
  }

  return next();
};
