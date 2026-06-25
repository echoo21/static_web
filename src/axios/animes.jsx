import { fetchList } from "../lib/tmdb"

export const PopularAnime   = () => fetchList("discover/tv?with_genres=16&sort_by=popularity.desc&vote_count.gte=50&language=en-US")
export const TopRatedAnime  = () => fetchList("discover/tv?with_genres=16&sort_by=vote_average.desc&vote_count.gte=200&language=en-US")
export const NewAnime       = () => fetchList("discover/tv?with_genres=16&sort_by=first_air_date.desc&vote_count.gte=50&language=en-US")
