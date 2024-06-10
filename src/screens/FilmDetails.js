import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilmDetailFromApi } from "../API/Request";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import cat from "../assets/cat.png";
import {
  addToFavoritesFilm,
  removeFromFavorites,
} from "../features/favoriteSlice";
import Nav from "../navbar/Nav";
import "./FilmDetails.css";

function FilmDetails({ route }) {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
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

  /* Get Data Film */
  useEffect(() => {
    getFilmDetailFromApi(id)
      .then((data) => {
        setMovie(data);
      })
      .finally(() => {});
  }, [id]);

  return (
    <div className="detailDiv">
      {/* NavBar */}
      <Nav />
      {movie && movie.success !== false ? (
        <>
          {/* {backgroundImage} */}
          <header
            className="backdrop"
            style={{
              backgroundSize: "cover",
              backgroundImage: movie.backdrop_path
                ? `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`
                : `url("../assets/cover.jpeg")`,
              backgroundPosition: "center center",
            }}
          >
            <div className="fadBottom"></div>
          </header>

          {/* {Content} */}
          <div className="wrapperDiv">
            <div className="content">
              <h1 className="title">
                {movie.name || movie.title || movie.original_name}
              </h1>

              <button
                className="buttonFav"
                onClick={() => addToFavorites(movie)}
              >
                {isCardInFavorites(movie) ? (
                  <FaHeart className="iconFav" />
                ) : (
                  <FaRegHeart className="iconFav" />
                )}
              </button>
              <h2 className="overview">{movie.overview}</h2>

              <h3 className="defaultText">
                Sorti le {""}
                {movie.release_date
                  ? movie.release_date
                  : "Date de sortie inconnue"}
              </h3>
              <h3 className="defaultText">Note : {movie.vote_average} / 10</h3>
              <h3 className="defaultText">
                {" "}
                Nombre de votes : {movie.vote_count}
              </h3>
              <h3 className="defaultText">Budget : {movie.budget} $</h3>
              <h3 className="defaultText">
                Genre(s): {""}
                {movie.genres &&
                  movie.genres.length > 0 &&
                  movie.genres.map((genre) => genre.name).join(" / ")}
              </h3>
              <h3 className="defaultText">
                Companie(s): {""}
                {movie.production_companies &&
                  movie.production_companies.length > 0 &&
                  movie.production_companies
                    .map((company) => company.name)
                    .join(" / ")}
              </h3>
            </div>
          </div>
        </>
      ) : (
        <div className="noDetails">
          <h1 className="Aucun"> Aucun détail de film disponible</h1>
          <img className="catIcon" src={cat} alt="" />
        </div>
      )}
    </div>
  );
}

export default FilmDetails;
