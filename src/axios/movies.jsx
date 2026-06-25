import { fetchList } from "../lib/tmdb"

export const PopularMovies     = () => fetchList("movie/popular")
export const TopRatedMovies    = () => fetchList("movie/top_rated")
export const UpcomingMovies    = () => fetchList("movie/upcoming")
