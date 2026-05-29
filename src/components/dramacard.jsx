import { Link } from "react-router-dom";

// Maps origin_country code to a readable label
const COUNTRY_LABEL = {
  KR: "Korean",
  CN: "Chinese",
  JP: "Japanese",
  TW: "Taiwanese",
  HK: "HK",
  TH: "Thai",
};

function DramaCard({ drama }) {
  const country = drama.origin_country?.[0];
  const countryLabel = COUNTRY_LABEL[country] ?? country;

  return (
    <Link to={`/watchtv/${drama.id}`}>
      <div className="group relative bg-zinc-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">

        {/* Poster */}
        <div className="relative overflow-hidden">
          <img
            src={
              drama.poster_path
                ? `https://image.tmdb.org/t/p/w500${drama.poster_path}`
                : "https://placehold.co/500x750?text=No+Image"
            }
            alt={drama.name}
            className="w-full h-72 object-cover group-hover:brightness-50 transition-all duration-300"
          />

          {/* Rating badge */}
          <div className="absolute top-2 right-2 bg-black/70 text-yellow-400 text-xs font-semibold px-2 py-1 rounded-full">
            ★ {drama.vote_average > 0 ? drama.vote_average.toFixed(1) : "N/A"}
          </div>

          {/* Country badge */}
          {countryLabel && (
            <div className="absolute top-2 left-2 bg-teal-500/80 text-white text-xs font-semibold px-2 py-1 rounded-full">
              {countryLabel}
            </div>
          )}

          {/* Hover overlay — show overview */}
          <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <p className="text-white text-sm leading-relaxed line-clamp-4">
              {drama.overview}
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="p-3">
          <h3 className="text-white font-semibold text-sm truncate">{drama.name}</h3>
          <p className="text-zinc-400 text-xs mt-1">{drama.first_air_date?.slice(0, 4)}</p>
        </div>

      </div>
    </Link>
  );
}

export default DramaCard;