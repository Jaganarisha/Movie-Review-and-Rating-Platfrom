const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const auth = require('../middleware/auth');


// Create movie (protected)
router.post('/', auth, async (req, res) => {
const { title, description, poster } = req.body;
try {
const movie = new Movie({ title, description, poster });
await movie.save();
res.json(movie);
} catch (err) {
console.error(err.message);
res.status(500).send('Server error');
}
});


// Get all movies
router.get('/', async (req, res) => {
try {
const movies = await Movie.find().sort({ createdAt: -1 });
res.json(movies);
} catch (err) {
console.error(err.message);
res.status(500).send('Server error');
}
});


// Get movie by id with reviews (reviews fetched on frontend via reviews route)
router.get('/:id', async (req, res) => {
try {
const movie = await Movie.findById(req.params.id);
if (!movie) return res.status(404).json({ msg: 'Movie not found' });
res.json(movie);
} catch (err) {
console.error(err.message);
if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Movie not found' });
res.status(500).send('Server error');
}
});


module.exports = router;