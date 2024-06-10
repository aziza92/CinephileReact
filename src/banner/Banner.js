import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Banner.css";
import axios from "axios";
import { requests } from "../API/Request";
import cover from "../assets/cover.jpeg";

const client = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default function Banner() {
  const [movie, setMovie] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const request = await client.get(requests.fetchNetflix);
      const res = request.data.results;
      setMovie(res[Math.floor(Math.random() * res.length - 1)]);
      return request;
    }
    fetchData();
  }, []);

  const handleClick = () => {
    // 👇️ navigate programmatically
    navigate("/favoris");
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",

        backgroundImage: movie.backdrop_path
          ? `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`
          : `url(${cover})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__content">
        <h1 className="banner__title">
          {movie.name || movie.title || movie.original_name}
        </h1>

        <div className="banner__buttons">
          <button className="banner__button"> Play </button>
          <button className="banner__button" onClick={handleClick}>
            {" "}
            Ma Liste{" "}
          </button>
        </div>

        <h1 className="banner__description">{movie.overview}</h1>
        <h1 className="banner__date">
          {movie.first_air_date
            ? movie.first_air_date
            : "Date de sortie inconnue"}
        </h1>
      </div>

      <div className="banner__fadBottom"></div>
    </header>
  );
}
