import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import tmdb, { imgUrl } from '../lib/tmdb'

export default function Search({ type = 'movie', isAnime = false }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [selected, setSelected] = useState(null)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const cache = useRef({})

  const isTV = type === 'tv'

  // Debounced live search with in-memory cache
  useEffect(() => {
    if (query.trim() === '') {
      setResults([])
      setLoading(false)
      setOpen(false)
      return
    }

    setLoading(true)
    setOpen(true)

    // Check memory cache first
    const cached = cache.current[query]
    if (cached) {
      setResults(cached)
      setLoading(false)
      return
    }

    const timeout = setTimeout(async () => {
      try {
        const endpoint = isTV ? 'search/tv' : 'search/movie'
        const res = await tmdb.get(`/${endpoint}`, { params: { query } })
        const items = res.data.results.slice(0, 6)
        cache.current[query] = items
        setResults(items)
      } catch (err) {
        console.error(err)
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => {
      clearTimeout(timeout)
      setLoading(false)
    }
  }, [query, isTV])

  const handleSelect = useCallback((item) => {
    if (!item) return
    setSelected(null)
    setQuery('')
    setOpen(false)
    navigate(isTV ? `/watchtv/${item.id}` : `/streamingmovie/${item.id}`)
  }, [isTV, navigate])

  const getLabel = (item) => item?.title ?? item?.name ?? ''

  return (
    <div className="w-full sm:w-64">
      <Combobox value={selected} onChange={handleSelect} open={open} onClose={() => setOpen(false)}>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {loading ? (
              <svg className="size-4 animate-spin text-gray-400" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <MagnifyingGlassIcon className="size-4 text-gray-400" />
            )}
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
            'w-[var(--input-width)] rounded-xl border border-white/20 backdrop-blur-xl bg-black/80 p-1 [--anchor-gap:4px] empty:invisible',
            'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 z-50'
          )}
        >
          {query !== '' && !loading && results.length === 0 && (
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
                  ? imgUrl(item.poster_path, 'w92')
                  : 'https://placehold.co/40x60?text=N/A'
                }
                alt={getLabel(item)}
                width="40"
                height="60"
                loading="lazy"
                decoding="async"
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
