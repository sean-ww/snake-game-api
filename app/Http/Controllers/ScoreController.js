const errors = require('restify-errors');
const Score = require('../../Models/Score');

const TOP_SCORE_LIMIT = 10;

exports.index = (req, res, next) => {
  Score.find({})
    .limit(TOP_SCORE_LIMIT)
    .sort({ score: -1 })
    .exec((err, docs) => {
      if (err) {
        return next(new errors.InternalError(err.message));
      }

      res.send(docs);
      next();
    });
};

exports.create = async (req, res, next) => {
  const data = req.body || {};

  const newScore = new Score(data);
  const isNewTopScore = await newScore.isTop(TOP_SCORE_LIMIT);

  if (!isNewTopScore) {
    return next(new errors.BadRequestError('%d is not a top score', data.score));
  }

  newScore.save(err => {
    if (err) {
      return next(new errors.InternalError(err.message));
    }

    res.send(201);
    next();
  });
};
