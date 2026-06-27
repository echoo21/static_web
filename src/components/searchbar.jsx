import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Search({ type = 'movie', isAnime = false }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [selected, setSelected] = useState(null)
  const navigate = useNavigate()

  const isTV = type === 'tv'

  useEffect(() => {
    if (query.trim() === '') return

    const timeout = setTimeout(async () => {
      try {
        const endpoint = isTV ? 'search/tv' : 'search/movie'
        const res = await axios.get(`https://api.themoviedb.org/3/${endpoint}`, {
          headers: { Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}` },
          params: { query }
        })
        setResults(res.data.results.slice(0, 6))
      } catch (err) {
        console.error(err)
      }
    }, 400)

    return () => clearTimeout(timeout)
  }, [query])

  const handleSelect = (item) => {
    if (!item) return
    setSelected(item)
    navigate(isTV ? `/watchtv/${item.id}` : `/streamingmovie/${item.id}`)
  }

  const getLabel = (item) => item?.title ?? item?.name ?? ''

  return (
    <div className="w-full sm:w-64">
      <Combobox value={selected} onChange={handleSelect}>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="size-4 text-gray-400" />
          </div>
          <ComboboxInput
            className={clsx(
              'w-full rounded-full border border-white/20 backdrop-blur-lg bg-white/10 py-1.5 pr-8 pl-9 text-sm/6 text-white',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 hover:border-white/30 hover:bg-white/15 transition-all duration-300'
            )}
            displayValue={getLabel}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isAnime ? 'Search anime...' : isTV ? 'Search dramas...' : 'Search movies...'}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom start"
          transition
          className={clsx(
            'w-[var(--input-width)] rounded-xl border border-white/20 backdrop-blur-xl bg-white/10 p-1 [--anchor-gap:4px] empty:invisible',
            'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 z-50'
          )}
        >
          {results.length === 0 && query !== '' && (
            <div className="px-3 py-2 text-sm text-zinc-500">No results for "{query}"</div>
          )}
          {results.map((item) => (
            <ComboboxOption
              key={item.id}
              value={item}
              className="group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 select-none data-[focus]:bg-white/10"
            >
              <img
                src={item.poster_path
                  ? `https://image.tmdb.org/t/p/w92${item.poster_path}`
                  : 'https://placehold.co/40x60?text=N/A'
                }
                className="w-8 h-12 object-cover rounded opacity-90"
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm text-white truncate">{getLabel(item)}</div>
                <div className="text-xs text-white/50">
                  {(item.release_date ?? item.first_air_date)?.slice(0, 4)}
                </div>
              </div>
              <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible shrink-0" />
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  )
}
