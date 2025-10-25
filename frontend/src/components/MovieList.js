import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="movie-list">
      {movies.length === 0 ? (
        <p>No movies available.</p>
      ) : (
        movies.map((movie) => <MovieCard key={movie._id} movie={movie} />)
      )}
    </div>
  );
}

export default MovieList;
