const validate = require('../Http/Middleware/validate');
const expectJson = require('../Http/Middleware/expectJson');

const ScoreRequest = require('../Http/Requests/ScoreRequest');
const controller = require('../Http/Controllers/ScoreController');

module.exports = server => {
  server.post(
    '/score',
    (req, res, next) => expectJson(req, next),
    (req, res, next) => validate(ScoreRequest, req, res, next),
    (req, res, next) => controller.create(req, res, next),
  );

  server.get('/score', (req, res, next) => controller.index(req, res, next));
};
