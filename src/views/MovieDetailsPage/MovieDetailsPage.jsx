import { Button } from "@mui/material";
import { useState, useEffect, lazy, Suspense } from "react";
import { useParams } from "react-router";
import {
  NavLink,
  useRouteMatch,
  useHistory,
  useLocation,
  Switch,
  Route,
} from "react-router-dom";
import { fetchMovieDetails } from "../../services/movieApi";
import s from "./MovieDetailsPage.module.css";

const BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCast = lazy(() =>
  import("./MovieCast" /* webpackChunkName: "cast" */)
);
const MovieReview = lazy(() =>
  import("./MovieReview" /*webpackChunkName: "reviews" */)
);

const MovieDetailsPage = () => {
  const [film, setFilm] = useState(null);

  const { movieId } = useParams();
  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();

  useEffect(() => {
    fetchMovieDetails(movieId).then((movie) => setFilm(movie));
  }, [movieId]);
  if (film === null) {
    return <h1> no data available</h1>;
  }

  const handleBack = () => {
    history.push(location?.state?.from);
  };

  return (
    <>
      <button type="button" onClick={handleBack} className={s.btn}>
        Go back
      </button>
      <div className={s.wrapper}>
        <img src={`${BASE_URL}${film.backdrop_path}`} alt={film.title} />
        <div>
          <h1 className={s.title}>{film.title}</h1>
          <p className={s.rating}>rating: {film.vote_average}</p>
          <p className={s.textInfo}>{film.overview}</p>
        </div>

        <ul>
          <li className={s.link}>
            <NavLink
              exact
              to={`${url}/${movieId}/cast`}
              className={s.link}
              activeClassName={s.active}
            >
              Cast
            </NavLink>
          </li>
          <li className={s.link}>
            <NavLink
              exact
              to={`${url}/${movieId}/reviews`}
              className={s.link}
              activeClassName={s.active}
            >
              Reviews
            </NavLink>
          </li>
        </ul>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Switch>
            <Route path={`${url}/${movieId}/cast`} exact>
              <MovieCast movieId={movieId} />
            </Route>
            <Route path={`${url}/${movieId}/reviews`} exact>
              <MovieReview movieId={movieId} />
            </Route>
          </Switch>
        </Suspense>
      </div>
    </>
  );
};

export default MovieDetailsPage;
