const Joi = require('@hapi/joi');

module.exports = Joi.object().keys({
  score: Joi.number().required(),
  name: Joi.string().required(),
});
