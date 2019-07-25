const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  score: {
    type: Number,
    index: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

// isTop method; check if the score is in the top {count} of scores. Score.isTop(10)
Schema.methods.isTop = async function(count) {
  const higherScoreCount = await this.model('Score').countDocuments({ score: { $gte: this.score } }, function(
    err,
    docCount,
  ) {
    return docCount;
  });

  return higherScoreCount < count;
};

module.exports = mongoose.model('Score', Schema);
