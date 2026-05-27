function MovieCard({ movie }) {
  return (
    <div className="group relative bg-zinc-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
      
      {/* Poster */}
      <div className="relative overflow-hidden">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://placehold.co/500x750?text=No+Image"
          }
          alt={movie.title}
          className="w-full h-72 object-cover group-hover:brightness-50 transition-all duration-300"
        />

        {/* Rating badge */}
        <div className="absolute top-2 right-2 bg-black/70 text-yellow-400 text-xs font-semibold px-2 py-1 rounded-full">
          {movie.vote_average?.toFixed(1)}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <p className="text-white text-sm leading-relaxed line-clamp-4">
            {movie.overview}
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="text-white font-semibold text-sm truncate">{movie.title}</h3>
        <p className="text-zinc-400 text-xs mt-1">{movie.release_date?.slice(0, 4)}</p>
      </div>

    </div>
  )
}

export default MovieCard;