import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`http://localhost:5000/api/movies/${id}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));

    fetch(`http://localhost:5000/api/reviews/${id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert("Login required to review");
    const res = await fetch(`http://localhost:5000/api/reviews/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-auth-token": token },
      body: JSON.stringify({ comment: review, rating: 4 }),
    });
    const data = await res.json();
    if (res.ok) {
      setReviews([...reviews, data]);
      setReview("");
    } else {
      alert(data.msg || "Failed to add review");
    }
  };

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-detail">
      <img src={movie.poster} alt={movie.title} />
      <div className="movie-info">
        <h2>{movie.title}</h2>
        <p>{movie.description}</p>

        <h3>Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <ul>
            {reviews.map((r) => (
              <li key={r._id}>{r.comment} — ⭐ {r.rating}</li>
            ))}
          </ul>
        )}

        <form onSubmit={handleReviewSubmit}>
          <textarea
            value={review}
            placeholder="Write a review..."
            onChange={(e) => setReview(e.target.value)}
            required
          />
          <button type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
}

export default MovieDetail;
