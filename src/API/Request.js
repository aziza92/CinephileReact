const API_TOKEN = process.env.REACT_APP_API_TOKEN;

export const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_TOKEN}&language=fr`,
  fetchNetflix: `/discover/tv?api_key=${API_TOKEN}&with_networks=213&language=fr`,
  fetchTopRated: `/movie/top_rated?api_key=${API_TOKEN}&language=fr`,
  fetchAction: `/discover/movie?api_key=${API_TOKEN}&with_genres=28&language=fr`,
  fetchComedy: `/discover/movie?api_key=${API_TOKEN}&with_genres=35&language=fr`,
  fetchHorror: `/discover/movie?api_key=${API_TOKEN}&with_genres=27&language=fr`,
  fetchRomance: `/discover/movie?api_key=${API_TOKEN}&with_genres=10749&language=fr`,
  fetchDocumentaries: `/discover/movie?api_key=${API_TOKEN}&with_genres=99&language=fr`,
};

// Récupération du détail d'un film
export async function getFilmDetailFromApi(id) {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        id +
        "?api_key=" +
        API_TOKEN +
        "&language=fr"
    );
    return await response.json();
  } catch (error) {
    return console.error(error);
  }
}
export async function getFilmsFromApiWithSearchedText(text) {
  const url =
    "https://api.themoviedb.org/3/search/movie?api_key=" +
    API_TOKEN +
    "&language=fr&query=" +
    text;
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
}
