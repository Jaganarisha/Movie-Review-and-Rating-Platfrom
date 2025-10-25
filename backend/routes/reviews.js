const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Movie = require('../models/Movie');
const auth = require('../middleware/auth');


// Add review (protected)
router.post('/:movieId', auth, async (req, res) => {
const { rating, comment } = req.body;
try {
const movie = await Movie.findById(req.params.movieId);
if (!movie) return res.status(404).json({ msg: 'Movie not found' });
const existing = await Review.findOne({ movie: movie.id, user: req.user.id });
if (existing) return res.status(400).json({ msg: 'You have already reviewed this movie' });
const review = new Review({ movie: movie.id, user: req.user.id, rating, comment });
await review.save();
// update movie aggregate
const allReviews = await Review.find({ movie: movie.id });
const reviewsCount = allReviews.length;
const avg = allReviews.reduce((acc, r) => acc + r.rating, 0) / reviewsCount;
movie.averageRating = parseFloat(avg.toFixed(2));
movie.reviewsCount = reviewsCount;
await movie.save();
res.json(review);
} catch (err) {
console.error(err.message);
res.status(500).send('Server error');
}
});


// Get reviews for a movie
router.get('/:movieId', async (req, res) => {
try {
const reviews = await Review.find({ movie: req.params.movieId }).populate('user', ['name']);
res.json(reviews);
} catch (err) {
console.error(err.message);
res.status(500).send('Server error');
}
});


module.exports = router;