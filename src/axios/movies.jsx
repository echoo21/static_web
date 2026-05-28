import axios from "axios";

async function PopularMovies() {
  try {
    const response = await axios.get("https://api.themoviedb.org/3/movie/popular", {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}` }
    })
    return response.data;
  } catch (err) {
    console.error("failed to fetch popular movies: ", err)
  }
}

async function TopRatedMovies() {
  try {
    const response = await axios.get("https://api.themoviedb.org/3/movie/top_rated", {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}` }
    })
    return response.data
  } catch (err) {
    console.error("failed to fetch top rated movies: ", err)
  }
}

async function UpcomingMovies() {
  try {
    const response = await axios.get("https://api.themoviedb.org/3/movie/upcoming", {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}` }
    })
    return response.data
  } catch (err) {
    console.error("failed to fetch upcoming movies: ", err)
  }
}

export { PopularMovies, TopRatedMovies, UpcomingMovies };