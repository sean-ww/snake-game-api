const Joi = require('@hapi/joi');

module.exports = (schema, req, res, next) => {
  const data = req.body || {};

  Joi.validate(data, schema, { abortEarly: false }, err => {
    if (err) {
      res.send(422, {
        code: 'UnprocessableEntity',
        message: 'Invalid request data',
        errors: err.details.map(error => {
          return { [error.context.key]: error.message };
        }),
      });

      return next(false);
    } else {
      return next();
    }
  });
};
