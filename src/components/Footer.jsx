import { Link } from 'react-router-dom'
import { navLinks, SITE, COMPLIANCE } from '../data/site'

export default function Footer() {
  return (
    <footer className="border-t border-black/[.06] mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
          <div className="max-w-sm">
            <div className="text-[17px] font-bold text-[#1d1d1f] mb-2">{SITE.name}</div>
            <p className="text-[13px] text-[#6e6e73] leading-relaxed">{SITE.desc}</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {navLinks.map(link => (
              <Link key={link.path} to={link.path} className="text-[13px] text-[#6e6e73] hover:text-[#e14e15] transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-black/[.06] flex flex-col md:flex-row justify-between gap-2">
          <p className="text-[12px] text-[#86868b]">{COMPLIANCE}</p>
          <p className="text-[12px] text-[#86868b]">
            <a className="hover:text-[#e14e15] transition-colors" href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <span className="mx-2">·</span>© {new Date().getFullYear()} {SITE.fullName}
          </p>
        </div>
      </div>
    </footer>
  )
}
