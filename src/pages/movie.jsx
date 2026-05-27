import { PopularMovies, TopRatedMovies, UpcomingMovies } from "../axios/movies"
import MovieCard from "../components/moviecard"
import useMovies from "../hooks/useMovies";


function Home() {
    const popularMovies = useMovies(PopularMovies)
    const topRatedMovies = useMovies(TopRatedMovies)
    const upcomingMovies = useMovies(UpcomingMovies)
    return (
        <div className="min-h-screen bg-zinc-950 px-8 py-10">

            <section className="mb-12">
                <h2 className="text-white text-2xl font-bold mb-6">Popular Movies</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {popularMovies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-white text-2xl font-bold mb-6">Top Rated</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {topRatedMovies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-white text-2xl font-bold mb-6">Upcoming</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {upcomingMovies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </section>

        </div>
    )
}

export default Home