import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink, Link, useLocation } from 'react-router-dom'
import Search from './searchbar'
import logo from "../assets/logo.png"

const navigation = [
  { name: 'Movie', href: '/movie' },
  { name: 'Film / Drama', href: '/drama' },
  { name: 'Anime', href: '/anime' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const location = useLocation()
  const searchType = location.pathname.startsWith('/drama') ? 'tv' : 'movie'
  return (
    <Disclosure as="nav" className="sticky top-0 z-50 w-full">
      {({ open }) => (
        <>
          {/* Glassmorphism bar */}
          <div className="relative border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between gap-8">

                {/* Logo */}
                <Link to="/" className="shrink-0">
                  <img
                    src={logo}
                    alt="logo"
                    className="h-8 w-auto transition-opacity duration-200 hover:opacity-75"
                  />
                </Link>

                {/* Desktop nav links */}
                <div className="hidden sm:flex items-center gap-1">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) =>
                        classNames(
                          isActive
                            ? 'text-white bg-white/10 border border-white/15'
                            : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent',
                          'rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200'
                        )
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>

                {/* Right side — search + mobile button */}
                <div className="flex items-center gap-3 ml-auto w-full sm:w-auto">
                  <Search type={searchType} />

                  {/* Mobile menu button */}
                  <div className="sm:hidden">
                    <DisclosureButton className="inline-flex items-center justify-center rounded-lg p-2 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10 transition-all duration-200">
                      {open ? (
                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="h-5 w-5" aria-hidden="true" />
                      )}
                    </DisclosureButton>
                  </div>
                </div>

              </div>
            </div>

            {/* Subtle bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          {/* Mobile menu */}
          <DisclosurePanel className="sm:hidden bg-zinc-950/95 backdrop-blur-xl border-b border-white/10">
            <div className="px-4 py-3 space-y-1">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as={NavLink}
                  to={item.href}
                  className={({ isActive }) =>
                    classNames(
                      isActive
                        ? 'text-white bg-white/10 border-white/15'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5 border-transparent',
                      'flex w-full rounded-lg px-4 py-2.5 text-sm font-medium border transition-all duration-200'
                    )
                  }
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}