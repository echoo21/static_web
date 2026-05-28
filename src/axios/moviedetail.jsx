import axios from "axios";


async function fetchMovieDetail(id) {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}` },
    });
    return response.data;
  } catch (err) {
    console.error("failed to fetch upcoming movies: ", err)
  }
}

export default fetchMovieDetail;