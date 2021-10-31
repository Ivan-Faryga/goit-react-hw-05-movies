import { useState, useEffect } from "react";
import { fetchMovieReviews } from "../../services/movieApi";
import s from "./MovieReview.module.css";

const BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieReview({ movieId }) {
  const [review, setReview] = useState([]);

  useEffect(() => {
    fetchMovieReviews(movieId).then(
      (response) => setReview(response.results) /*setCast(response.cast)*/
    );
  }, [movieId]);
  return (
    <>
      {!review.length && (
        <h3 className={s.notification}>
          there are no reviews. Be the first one on TMDB
        </h3>
      )}
      {review.length && (
        <ul className={s.list}>
          {review.map((item) => {
            return (
              <li key={item.id}>
                <p className={s.user}>{item.author_details.username}</p>
                <p className={s.review}>{item.content}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default MovieReview;
