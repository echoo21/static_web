import { fetchList } from "../lib/tmdb"

export const AiringTodayDramas  = () => fetchList("tv/airing_today")
export const OnTheAirDramas     = () => fetchList("tv/on_the_air")
export const PopularDramas      = () => fetchList("tv/popular")
export const TopRatedDramas     = () => fetchList("tv/top_rated")
