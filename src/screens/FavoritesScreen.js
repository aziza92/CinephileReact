import React from "react";
import { removeFromFavorites } from "../features/favoriteSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import Nav from "../navbar/Nav";
import "./FavoritesScreen.css";

const base_url = "https://image.tmdb.org/t/p/original/";

export default function FavoritesScreen({ isLargeRow = true }) {
  const favoritesItems = useSelector((state) => state.favoriteFilm.favorites);
  const dispatch = useDispatch();
  console.log(favoritesItems);

  // Add To Favorite ::
  const removeFilmFromFavorites = (film) => {
    dispatch(removeFromFavorites(film));
  };
  return (
    <div>
      <Nav />
      <div className="favScreen__body">
        <h1> Mes Films préférés </h1>
      </div>

      <div className="posters">
        {favoritesItems.map((movie) => (
          <div className="container" key={movie.id}>
            <img
              className={`poster ${isLargeRow && "posterLarge"}`}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
            <p>
              <button
                className="button"
                onClick={() => removeFilmFromFavorites(movie)}
              >
                <FaHeart className="iconHeart" />
              </button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
