import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../../hooks/useLanguage'
import type { Language } from '../../context/LanguageContext'

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'ca', label: 'CA' },
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'fr', label: 'FR' },
]

const NAV_LINKS = [
  { path: '/', label: 'EL BAR' },
  { path: '/carta', label: 'NUESTRA CARTA' },
  { path: '/contacto', label: 'RESERVAS' },
]

export default function Header() {
  const { t } = useTranslation()
  const { language, changeLanguage } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <header style={{ backgroundColor: '#411F10' }} className="w-full text-white">

      {/* ===== BARRA SUPERIOR DESKTOP ===== */}
      <div
        className="hidden md:flex items-start justify-between w-full"
        style={{ paddingLeft: '42px', paddingRight: '42px', paddingTop: '20px', paddingBottom: '20px' }}
      >
        {/* LOGO IZQUIERDA */}
        <Link to="/" className="flex items-center" style={{ marginTop: '26px' }}>
          <img
            src="src/assets/diseño/Logo-Izq.png"
            alt="Casa Vèndrell"
            style={{ width: '147px', height: '16.26px' }}
            className="brightness-0 invert"
          />
        </Link>

        {/* DERECHA — Idiomas arriba + Nav abajo */}
        <div className="flex flex-col items-end" style={{ gap: '9px' }}>

          {/* IDIOMAS — Y:20 */}
          <div className="flex items-center gap-2">
            {LANGUAGES.map((lang, i) => (
              <span key={lang.code} className="flex items-center gap-2">
                <button
                  onClick={() => changeLanguage(lang.code)}
                  className="transition-colors"
                  style={{
                    fontSize: '12px',
                    fontWeight: language === lang.code ? '600' : '400',
                    color: language === lang.code
                      ? '#C65427'
                      : 'rgba(217,217,217,0.7)',
                    letterSpacing: '0.1em',
                  }}
                >
                  {lang.label}
                </button>
                {i < LANGUAGES.length - 1 && (
                  <span style={{ color: 'rgba(217,217,217,0.3)', fontSize: '12px' }}>·</span>
                )}
              </span>
            ))}
          </div>

          {/* NAV LINKS — Y:43 */}
          <nav className="flex items-center" style={{ gap: '47px' }}>
            {NAV_LINKS.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className="transition-colors whitespace-nowrap"
                style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: location.pathname === link.path
                    ? '#C65427'
                    : '#D9D9D9',
                  letterSpacing: '0.05em',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* ===== BARRA MÓVIL ===== */}
      <div className="md:hidden flex items-center justify-between px-6 py-4">
        <Link to="/">
          <img
            src="/logo/logo-text.svg"
            alt="Casa Vèndrell"
            className="h-4 brightness-0 invert"
          />
        </Link>
        <button
          className="flex flex-col gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          <span className="block w-6 h-px bg-white"></span>
          <span className="block w-6 h-px bg-white"></span>
          <span className="block w-6 h-px bg-white"></span>
        </button>
      </div>

      {/* ===== HERO — solo en Home ===== */}
{isHome && (
  <div className="w-full flex flex-col items-center">

    {/* È LOGO */}
    <img
      src="src/assets/diseño/E.png"
      alt="È"
      style={{
        width: '82.44px',
        height: '133.22px',
        marginTop: '209px',
        objectFit: 'contain'
      }}
    />

    {/* CASA VÈNDRELL */}
    <img
      src="src/assets/diseño/Nom-log.png"
      alt="Casa Vèndrell"
      style={{
        width: '235.07px',
        height: '26.01px',
        marginTop: '24px',
      }}
    />

    {/* BAR DE VINOS */}
    <p
      style={{
        fontSize: '14px',
        fontWeight: '600',
        color: '#D9D9D9',
        letterSpacing: '0.25em',
        lineHeight: '120%',
        marginTop: '37px',
      }}
    >
      {t('home.hero_subtitle')}
    </p>

    {/* BOTONES CARTA + RESERVAS */}
    <div
      className="flex items-center"
      style={{ gap: '19px', marginTop: '37px' }}
    >
<Link
  to="/carta"
  className="btn-hero flex items-center justify-center transition-all duration-200 border border-[#D9D9D9] text-[#D9D9D9]"
  style={{
    width: '150px',
    height: '39px',
    fontSize: '14px',
    fontWeight: '400',
    letterSpacing: '0.25em',
    lineHeight: '120%',
  }}
>
  CARTA
</Link>
<a
  href="https://wa.me/34634938879"
  target="_blank"
  rel="noopener noreferrer"
  className="btn-hero flex items-center justify-center transition-all duration-200 border border-[#D9D9D9] text-[#D9D9D9]"
  style={{
    width: '150px',
    height: '39px',
    fontSize: '14px',
    fontWeight: '400',
    letterSpacing: '0.25em',
    lineHeight: '120%',
  }}
>
  RESERVAS
</a>
    </div>

    {/* INFO DIRECCIÓN */}
    <div
      className="flex flex-col items-center text-center"
      style={{
        width: '320px',
        marginTop: '165px',
        marginBottom: '40px',
        gap: '8px',
      }}
    >
      <a
      href="https://www.google.es/maps/place/Casa+Vendrell/@41.3815743,2.1529301,17z/data=!3m2!4b1!5s0x12a4a2881b00cc37:0xa74c609d267128e3!4m6!3m5!1s0x12a4a3bce7b09e63:0x39566abfb8e426fb!8m2!3d41.3815743!4d2.1555104!16s%2Fg%2F11xhbhpkvy?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D"
    target="_blank"
    rel="noopener noreferrer"
    style={{
    fontSize: '13px',
    fontWeight: '600',
    color: '#D9D9D9',
    letterSpacing: '0.05em',
  }}
  className="hover:text-white transition-colors"
>
  DIPUTACIÓ 110. 08015 BARCELONA
</a>
      <p
        style={{
          fontSize: '13px',
          fontWeight: '600',
          color: '#D9D9D9',
          letterSpacing: '0.05em',
        }}
      >
        LUNES - SÁBADOS
      </p>
      <a
        href="https://www.instagram.com/casavendrell/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontSize: '13px',
          fontWeight: '600',
          color: '#D9D9D9',
          letterSpacing: '0.05em',
          marginTop: '8px',
        }}
      >
        @CASAVENDRELL
      </a>
    </div>

  </div>
)}

      {/* ===== MENÚ MÓVIL ===== */}
      {menuOpen && (
        <div
          style={{ backgroundColor: '#411F10' }}
          className="md:hidden px-6 py-6 flex flex-col gap-5 border-t border-white/10"
        >
          {NAV_LINKS.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-widest uppercase"
              style={{ color: location.pathname === link.path ? '#C65427' : '#D9D9D9' }}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-4 pt-4 border-t border-white/10">
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => {
                  changeLanguage(lang.code)
                  setMenuOpen(false)
                }}
                style={{
                  fontSize: '12px',
                  color: language === lang.code ? '#C65427' : 'rgba(217,217,217,0.7)',
                }}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}