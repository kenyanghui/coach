import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { navLinks, SITE } from '../data/site'

export default function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled || menuOpen ? 'bg-white/80 backdrop-blur-xl backdrop-saturate-150 border-b border-black/[.06]' : 'bg-white/60 backdrop-blur-md'
    }`}>
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-[19px] font-bold tracking-tight text-[#1d1d1f]">{SITE.name}</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3.5 py-1.5 rounded-full text-[13.5px] font-medium transition-all duration-200 ${
                location.pathname.startsWith(link.path)
                  ? 'text-[#e14e15] bg-[#ff5a1f]/10'
                  : 'text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/[.04]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/[.05] transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="菜单"
        >
          <div className="w-5 space-y-1.5">
            <span className={`block h-[1.5px] bg-[#1d1d1f] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block h-[1.5px] bg-[#1d1d1f] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-[1.5px] bg-[#1d1d1f] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </div>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-black/[.06] px-4 py-3 space-y-0.5">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-[15px] font-medium transition-colors ${
                location.pathname.startsWith(link.path)
                  ? 'text-[#e14e15] bg-[#ff5a1f]/10'
                  : 'text-[#1d1d1f] hover:bg-black/[.04]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
