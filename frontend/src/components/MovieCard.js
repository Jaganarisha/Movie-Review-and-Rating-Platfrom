import React from 'react';
import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: 8,
      padding: 16,
      backgroundColor: '#f9f9f9',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }}>
      <h3>
        <Link to={`/movies/${movie._id}`} style={{ textDecoration: 'none', color: '#333' }}>
          {movie.title}
        </Link>
      </h3>
      <p><strong>Genre:</strong> {movie.genre || 'N/A'}</p>
      <p><strong>Language:</strong> {movie.language || 'N/A'}</p>
      <p>⭐ <strong>{movie.avgRating ? movie.avgRating.toFixed(1) : 'No ratings yet'}</strong></p>
      <p>🗒️ <strong>{movie.reviewCount || 0}</strong> Reviews</p>
    </div>
  );
}
