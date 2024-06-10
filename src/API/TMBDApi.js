const API_TOKEN = process.env.REACT_APP_API_TOKEN;

// 1 Récupération des films tendance
export function fetchTrendingMovie() {
  return fetch(
    "https://api.themoviedb.org/3/trending/all/week?api_key=" +
      API_TOKEN +
      "&language=fr"
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

// 2 Récupération des films Netflix original :::
export function fetchNetflixOriginals() {
  return fetch(
    "https://api.themoviedb.org/3/discover/tv?api_key=" +
      API_TOKEN +
      "&with_networks=213&language=fr"
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

// 3 Récupération des films Top Rated
export function fetchTopRated() {
  return fetch(
    "https://api.themoviedb.org/3/movie/top_rated?api_key=" +
      API_TOKEN +
      "language=fr"
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

// 4 Récupération des films sur base de genres (Action)
export function fetchActionMovie() {
  return fetch(
    "https://api.themoviedb.org/3/discover/movie?api_key=" +
      API_TOKEN +
      "&with_genres=28&language=fr"
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

// 5 Récupération des films sur base de genres (Comedy)
export function fetchComedyMovie() {
  return fetch(
    "https://api.themoviedb.org/3/discover/movie?api_key=" +
      API_TOKEN +
      "&with_genres=35&language=fr"
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

// 6 Récupération des films sur base de genres (Horror)
export function fetchHorrorMovie() {
  return fetch(
    "https://api.themoviedb.org/3/discover/movie?api_key=" +
      API_TOKEN +
      "&with_genres=27&language=fr"
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

// 7 Récupération des films sur base de genres (Romance)
export function fetchRomanceMovie() {
  return fetch(
    "https://api.themoviedb.org/3/discover/movie?api_key=" +
      API_TOKEN +
      "&with_genres=10749&language=fr"
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));
}
// 8 Récupération des films sur base de genres (Documentaries)
export function fetchDocumentaries() {
  return fetch(
    "https://api.themoviedb.org/3/discover/movie?api_key=" +
      API_TOKEN +
      "&with_genres=99&language=fr"
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));
}
