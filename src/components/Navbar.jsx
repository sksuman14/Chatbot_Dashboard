import { useState, useEffect } from 'react'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { href: '#features', label: 'Features' },
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#architecture', label: 'Architecture' },
    { href: '#workflow', label: 'Workflow' },
    { href: '#specs', label: 'Specifications' },
    { href: '#contact', label: 'Contact' },
  ]

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    document.body.style.overflow = ''
    const target = document.querySelector(href)
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
    document.body.style.overflow = !menuOpen ? 'hidden' : ''
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#" className="nav-logo">
          <div className="logo-icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="2" y="2" width="24" height="24" rx="6" stroke="url(#logoGrad)" strokeWidth="2.5"/>
              <path d="M8 14L12 18L20 10" stroke="url(#logoGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="logoGrad" x1="2" y1="2" x2="26" y2="26">
                  <stop stopColor="#25D366"/>
                  <stop offset="1" stopColor="#128C7E"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span>Liquidation Tracker</span>
        </a>
        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link" onClick={(e) => handleLinkClick(e, link.href)}>
              {link.label}
            </a>
          ))}
        </div>
        <button className={`nav-toggle ${menuOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Toggle navigation">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
