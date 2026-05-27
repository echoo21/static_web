import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink, Link } from 'react-router-dom' // Import NavLink
import Search from './searchbar'
import logo from "../assets/logo.png"

const navigation = [
  { name: 'Movie', href: '/movie' },
  { name: 'Film / Drama', href: '/drama' },
  { name: 'Anime', href: '/anime'},
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  return (
    <Disclosure as="nav" className="relative backdrop-blur-[20px] bg-white/[0.08] bg-opacity-[0.03] border border-white/[0.18] shadow-[0_0px_20px_0_rgba(0,0,0,0.15)] hover:bg-white/[0.12] hover:border-white/[0.25] transition-all duration-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          
          {/* Mobile Menu Button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/10 hover:text-white transition-all duration-300 backdrop-blur-lg border border-white/20 bg-white/5">
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link to="/">
                <img
                  alt="logo picture"
                  src={logo}
                  className="h-8 w-auto cursor-pointer hover:scale-105 transition-transform duration-300" // Added cursor-pointer for better UX
                />
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) => classNames(
                      isActive ? 'bg-white/20 backdrop-blur-lg border border-white/30 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium transition-all duration-300'
                    )}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <Search />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={NavLink} // This tells Headless UI to render NavLink instead of 'a'
              to={item.href}
              className={({ isActive }) => classNames(
                isActive ? 'bg-white/20 backdrop-blur-lg border border-white/30 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium transition-all duration-300'
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}