import axios from "axios";

const API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDAyMTcwY2VmYTYxYjNlZTE2NmNlMjk1YjBlMTM2NiIsIm5iZiI6MTc3OTg1NjkxNS4zMDQ5OTk4LCJzdWIiOiI2YTE2NzYxMzg4NWJiNGY1ODM2MzQ3NWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.SltEmv0IZkUW1BnNDCn1xjsZE2aJsCh0MDXhxivnkEU"

async function PopularMovies() {
  try {
    const response = await axios.get("https://api.themoviedb.org/3/movie/popular", {
      headers: { Authorization: `Bearer ${API_TOKEN}` }
    })
    return response.data;
  } catch (err) {
    console.error("failed to fetch popular movies: ", err)
  }
}

async function TopRatedMovies() {
  try {
    const response = await axios.get("https://api.themoviedb.org/3/movie/top_rated", {
      headers: { Authorization: `Bearer ${API_TOKEN}` }
    })
    return response.data
  } catch (err) {
    console.error("failed to fetch top rated movies: ", err)
  }
}

async function UpcomingMovies() {
  try {
    const response = await axios.get("https://api.themoviedb.org/3/movie/upcoming", {
      headers: { Authorization: `Bearer ${API_TOKEN}` }
    })
    return response.data
  } catch (err) {
    console.error("failed to fetch upcoming movies: ", err)
  }
}

export { PopularMovies, TopRatedMovies, UpcomingMovies };