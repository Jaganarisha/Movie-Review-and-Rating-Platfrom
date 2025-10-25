import React, { useEffect, useState } from 'react';
import API from '../api';
import MovieCard from '../components/MovieCard';

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    API.get('/movies')
      .then(res => setMovies(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="mb-4">🎬 Movie List</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))',
        gap: '1rem'
      }}>
        {movies.map(m => <MovieCard key={m._id} movie={m} />)}
      </div>
    </div>
  );
}
