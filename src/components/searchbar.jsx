import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useState } from 'react'

const movies = [
  { id: 1, name: 'Dune: Part Two' },
  { id: 2, name: 'Avatar: The Way of Water' },
  { id: 3, name: 'The Batman' },
  { id: 4, name: 'Oppenheimer' },
  { id: 5, name: 'Spider-Man: Across the Spider-Verse' },
]

export default function Search() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null) // null agar awalnya kosong

  const filteredMovies =
    query === ''
      ? movies
      : movies.filter((movie) => {
          return movie.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <div className="w-64"> 
      <Combobox value={selected} onChange={(value) => setSelected(value)} onClose={() => setQuery('')}>
        <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="size-4 text-gray-400" />
        </div>
          <ComboboxInput
            className={clsx(
              'w-full rounded-full border border-white/20 backdrop-blur-lg bg-white/10 py-1.5 pr-8 pl-9 text-sm/6 text-white',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 hover:border-white/30 hover:bg-white/15 transition-all duration-300'
            )}
            displayValue={(movie) => movie?.name}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search movies..."
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom start" // Mengunci posisi dropdown tepat di bawah input
          transition
          className={clsx(
            'w-[var(--input-width)] rounded-xl border border-white/20 backdrop-blur-lg bg-white/10 p-1 [--anchor-gap:4px] empty:invisible hover:bg-white/15',
            'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 z-50'
          )}
        >
          {filteredMovies.map((movie) => (
            <ComboboxOption
              key={movie.id}
              value={movie}
              className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-[focus]:bg-white/10"
            >
              <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
              <div className="text-sm/6 text-white">{movie.name}</div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  )
}