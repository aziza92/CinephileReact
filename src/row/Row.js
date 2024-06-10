import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  addToFavoritesFilm,
  removeFromFavorites,
} from "../features/favoriteSlice";
import axios from "axios";
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";
const client = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

function Row({ title, fetchUrl, isLargeRow = false }) {
  // movies && movies.map = use it if is an empty array it's just for check
  const [movies, setMovie] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favoritesItems = useSelector((state) => state.favoriteFilm.favorites);
  // Change the Icon when Favorite ::
  const isCardInFavorites = (film) => {
    return favoritesItems.find((item) => item.id === film.id);
  };
  // Add To Favorite ::
  const addToFavorites = (film) => {
    if (isCardInFavorites(film)) {
      dispatch(removeFromFavorites(film));
    } else {
      dispatch(addToFavoritesFilm(film));
    }
  };

  useEffect(() => {
    async function fetchData() {
      const request = await client.get(fetchUrl);
      setMovie(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const displayDetailForFilm = (movieId) => {
    navigate(`/details/${movieId}`);
  };

  return (
    <div className="rowScreen">
      <h2 className="title">{title}</h2>
      {movies.length > 0 ? (
        <div className="row__posters">
          {movies.map(
            (movie) =>
              ((isLargeRow && movie.poster_path) ||
                (!isLargeRow && movie.backdrop_path)) && (
                <div className="container" key={movie.id}>
                  <img
                    className={`row__poster ${
                      isLargeRow && "row__posterLarge"
                    }`}
                    src={`${base_url}${
                      isLargeRow ? movie.poster_path : movie.backdrop_path
                    }`}
                    alt={movie.name}
                    onClick={() => displayDetailForFilm(movie.id)}
                  />
                  {movies.length > 0 ? (
                    <p>
                      <button
                        className="heart"
                        onClick={() => addToFavorites(movie)}
                      >
                        {isCardInFavorites(movie) ? (
                          <FaHeart className="icon" />
                        ) : (
                          <FaRegHeart className="icon" />
                        )}
                      </button>
                    </p>
                  ) : null}
                </div>
              )
          )}
        </div>
      ) : null}
    </div>
  );
}
export default Row;
