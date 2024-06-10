import React, { useState, useEffect } from "react";
import { getFilmsFromApiWithSearchedText } from "../API/Request";
import poster from "../assets/Film-Affiche.png";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "./Search.css";

const base_url = "https://image.tmdb.org/t/p/original/";

export default function Search(props) {
  // eslint-disable-next-line
  const { isOpen } = props;
  // eslint-disable-next-line
  const [isFocus, setIsFocus] = useState(false);
  const [searchedMovie, setSearchedMovie] = useState("");
  const [movies, setmovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadFilms = () => {
      if (searchedMovie.length > 0) {
        getFilmsFromApiWithSearchedText(searchedMovie)
          .then((data) => {
            setmovies(data.results);
          })
          .catch((error) => {
            console.log("Error fetching films:", error);
          });
      } else {
        setmovies([]);
      }
    };

    loadFilms();
  }, [searchedMovie]);

  const searchTextInputChanged = (event) => {
    const searchText = event.target.value;
    setSearchedMovie(searchText);
  };
  const displayDetailForFilm = (movieId) => {
    navigate(`/details/${movieId}`);
  };

  return (
    <Wrapper isOpen={isOpen}>
      {/* {input} */}
      <Container>
        <Input
          type="search"
          placeholder="Titre du film"
          value={searchedMovie}
          onChange={searchTextInputChanged}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
        <Icon>🔍</Icon>
      </Container>
      {/* {input} */}

      <WrapperSearchedFilm>
        {movies &&
          movies.map((movie) => (
            <RowDiv key={movie.id}>
              {movie.backdrop_path ? (
                <Poster
                  src={`${base_url}${movie.backdrop_path}`}
                  alt={movie.name}
                  onClick={() => displayDetailForFilm(movie.id)}
                />
              ) : (
                <Poster src={poster} alt={movie.name} /> // Replace `localImage` with the path to your local image
              )}
              <Name>{movie.original_title}</Name>
            </RowDiv>
          ))}
      </WrapperSearchedFilm>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  top: 60px;
  right: 50px;
  width: 250px;
  padding: 10px;
  background: rgba(15, 14, 71, 0.3);
  box-shadow: 0px 50px 100px rgba(0, 0, 0, 0.25),
    inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(40px);
  border-radius: 20px;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  z-index: 1;
  transition: 0.3s ease-in-out;
  /* the same think display / visibility   */
  /* display: ${(props) => (props.isOpen ? "black" : "none")}; */
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};

  transform: ${(props) =>
    props.isOpen
      ? "skewY(0) rotate(0) translateY(0)"
      : "skewY(-5deg) rotate(5deg) translateY(-30px)"};
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4px;
`;
const Input = styled.input`
  border-width: 1;
  width: 230px;
  border-color: ${(props) => (props.isFocus ? "white" : "#E100FF")};
  border-radius: 20px;
  background-color: transparent;
  padding: 10px;
  padding-left: 1.7rem;
  color: white;
`;

const Icon = styled.span`
  position: absolute;
  left: 28px;
`;

const WrapperSearchedFilm = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  overflow-x: hidden;
  overflow-y: scroll;
  scroll-behavior: smooth;
  ::-webkit-scrollbar {
    display: none;
  }
  cursor: pointer;
`;
const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 4px;
`;
const Poster = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin: 5px;
`;
const Name = styled.h1`
  color: white;
  font-size: medium;
  left: 5px;
  font-family: fantasy;
`;
