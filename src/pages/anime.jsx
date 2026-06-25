import { useMemo } from "react"
import useFetch from "../hooks/useFetch"
import DramaCard from "../components/dramacard"
import ScrollSection from "../components/ScrollSection"
import { PopularAnime, TopRatedAnime, NewAnime } from "../axios/animes"

const LIMIT = 20

function Anime() {
  const popularAnime = useFetch(PopularAnime)
  const topRatedAnime = useFetch(TopRatedAnime)
  const newAnime = useFetch(NewAnime)

  const popularSlice = useMemo(() => popularAnime.slice(0, LIMIT), [popularAnime])
  const topSlice = useMemo(() => topRatedAnime.slice(0, LIMIT), [topRatedAnime])
  const newSlice = useMemo(() => newAnime.slice(0, LIMIT), [newAnime])

  return (
    <div className="min-h-screen bg-zinc-950 px-8 py-10">

      <ScrollSection title="Popular Anime">
        {popularSlice.map((show) => (
          <div key={show.id} className="shrink-0 w-40"><DramaCard drama={show} /></div>
        ))}
      </ScrollSection>

      <ScrollSection title="Top Rated Anime">
        {topSlice.map((show) => (
          <div key={show.id} className="shrink-0 w-40"><DramaCard drama={show} /></div>
        ))}
      </ScrollSection>

      <ScrollSection title="New & Recent">
        {newSlice.map((show) => (
          <div key={show.id} className="shrink-0 w-40"><DramaCard drama={show} /></div>
        ))}
      </ScrollSection>

    </div>
  )
}

export default Anime
