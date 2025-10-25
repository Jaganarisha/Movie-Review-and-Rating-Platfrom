const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: String,
  createdAt: { type: Date, default: Date.now }
});

// update movie average rating and review count
reviewSchema.statics.updateMovieStats = async function (movieId) {
  const Review = this;
  const Movie = mongoose.model('Movie');
  const stats = await Review.aggregate([
    { $match: { movieId: mongoose.Types.ObjectId(movieId) } },
    { $group: { _id: '$movieId', avgRating: { $avg: '$rating' }, reviewCount: { $sum: 1 } } }
  ]);

  if (stats.length > 0) {
    await Movie.findByIdAndUpdate(movieId, {
      avgRating: stats[0].avgRating,
      reviewCount: stats[0].reviewCount
    });
  } else {
    await Movie.findByIdAndUpdate(movieId, { avgRating: 0, reviewCount: 0 });
  }
};

reviewSchema.post('save', function () {
  this.constructor.updateMovieStats(this.movieId).catch(console.error);
});

reviewSchema.post('remove', function () {
  this.constructor.updateMovieStats(this.movieId).catch(console.error);
});

module.exports = mongoose.model('Review', reviewSchema);
