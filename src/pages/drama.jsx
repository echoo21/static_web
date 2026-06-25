import { useMemo } from "react"
import useFetch from "../hooks/useFetch"
import DramaCard from "../components/dramacard"
import ScrollSection from "../components/ScrollSection"
import { AiringTodayDramas, OnTheAirDramas, PopularDramas, TopRatedDramas } from "../axios/dramas"

const LIMIT = 20

function Drama() {
  const airingtodaydramas = useFetch(AiringTodayDramas)
  const ontheair = useFetch(OnTheAirDramas)
  const populardramas = useFetch(PopularDramas)
  const toprateddramas = useFetch(TopRatedDramas)

  const airingSlice = useMemo(() => airingtodaydramas.slice(0, LIMIT), [airingtodaydramas])
  const onairSlice = useMemo(() => ontheair.slice(0, LIMIT), [ontheair])
  const popularSlice = useMemo(() => populardramas.slice(0, LIMIT), [populardramas])
  const topSlice = useMemo(() => toprateddramas.slice(0, LIMIT), [toprateddramas])

  return (
    <div className="min-h-screen bg-zinc-950 px-8 py-10">

      <ScrollSection title="Airing Today">
        {airingSlice.map((drama) => (
          <div key={drama.id} className="shrink-0 w-40"><DramaCard drama={drama} /></div>
        ))}
      </ScrollSection>

      <ScrollSection title="On the Air">
        {onairSlice.map((drama) => (
          <div key={drama.id} className="shrink-0 w-40"><DramaCard drama={drama} /></div>
        ))}
      </ScrollSection>

      <ScrollSection title="Popular Dramas">
        {popularSlice.map((drama) => (
          <div key={drama.id} className="shrink-0 w-40"><DramaCard drama={drama} /></div>
        ))}
      </ScrollSection>

      <ScrollSection title="Top Rated Dramas">
        {topSlice.map((drama) => (
          <div key={drama.id} className="shrink-0 w-40"><DramaCard drama={drama} /></div>
        ))}
      </ScrollSection>

    </div>
  )
}

export default Drama
