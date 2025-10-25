const API = 'http://localhost:5000/api';

// Register user
export async function register(data) {
  const res = await fetch(`${API}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Login user
export async function login(data) {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Fetch all movies
export async function fetchMovies() {
  const res = await fetch(`${API}/movies`);
  return res.json();
}

// Fetch a single movie by ID
export async function fetchMovie(id) {
  const res = await fetch(`${API}/movies/${id}`);
  return res.json();
}

// Fetch all reviews for a movie
export async function fetchReviews(movieId) {
  const res = await fetch(`${API}/reviews/${movieId}`);
  return res.json();
}

// Post a new review
export async function addReview(movieId, review, token) {
  const res = await fetch(`${API}/reviews/${movieId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    },
    body: JSON.stringify(review),
  });
  return res.json();
}
