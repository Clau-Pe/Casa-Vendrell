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
function LanguageSelector({ language, changeLanguage }: {
  language: Language
  changeLanguage: (lang: Language) => void
}) {
  const [open, setOpen] = useState(false)
  const others = (['ca', 'es', 'en', 'fr'] as Language[]).filter(l => l !== language)

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          fontSize: '12px',
          fontWeight: '600',
          color: '#C65427',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}
      >
        {language.toUpperCase()} ▾
      </button>
      {open && (
        <div
          style={{
            position: 'absolute',
            top: '28px',
            right: 0,
            backgroundColor: '#411F10',
            border: '1px solid rgba(217,217,217,0.2)',
            padding: '8px 0',
            zIndex: 100,
            minWidth: '60px',
          }}
        >
          {others.map(l => (
            <button
              key={l}
              onClick={() => {
                changeLanguage(l)
                setOpen(false)
              }}
              className="block w-full text-center py-2 hover:opacity-70"
              style={{
                fontSize: '12px',
                fontWeight: '400',
                color: 'rgba(217,217,217,0.7)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Header() {
  const { t } = useTranslation()
  const { language, changeLanguage } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isMenu = location.pathname === '/carta'

const NAV_LINKS = [
  { path: '/', label: t('nav.el_bar'), external: false, href: null },
  { path: '/carta', label: t('nav.nuestra_carta'), external: false, href: null },
  { path: '/contacto', label: t('nav.reservas'), external: true, href: 'https://wa.me/34634938879' },
]

  return (
    <header style={{ backgroundColor: '#411F10' }} className="w-full text-white">

      {/* ===== BARRA SUPERIOR DESKTOP ===== */}
      <div
        className="hidden md:flex items-start justify-between w-full"
        style={{ paddingLeft: '42px', paddingRight: '42px', paddingTop: '20px', paddingBottom: '20px' }}
      >
        {/* LOGO IZQUIERDA */}
        <Link to="/" className="mt-1">
        <img
        src={isMenu ? '/images/hero/Nom-log.png' : '/images/hero/Logo-Izq.png'}
        alt="Casa Vendrell"
        style={{ height: '16px', marginTop: '28px'}}
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
  {NAV_LINKS.map(link =>
    link.external
      ? <a
          key={link.label}
          href={link.href!}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors whitespace-nowrap"
          style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#D9D9D9',
            letterSpacing: '0.05em',
          }}
        >
          {link.label}
        </a>
      : <Link
          key={link.path}
          to={link.path}
          className="transition-colors whitespace-nowrap"
          style={{
            fontSize: '14px',
            fontWeight: '600',
            color: location.pathname === link.path ? '#C65427' : '#D9D9D9',
            letterSpacing: '0.05em',
          }}
        >
          {link.label}
        </Link>
  )}
</nav>
        </div>
      </div>

{/* ===== BARRA MÓVIL ===== */}
<div className="md:hidden flex items-center justify-between" style={{ padding: '16px' }}>
  <Link to="/">
    <img
      src={isMenu ? '/images/hero/Nom-log.png' : '/images/hero/Logo-Izq.png'}
      alt="Casa Vendrell"
      style={{ height: '16px' }}
    />
  </Link>
  <div className="flex items-center gap-4">
    <LanguageSelector language={language} changeLanguage={changeLanguage} />
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
</div>

      {/* ===== HERO — solo en Home ===== */}
{isHome && (
  <div className="w-full flex flex-col items-center">

    {/* È LOGO */}
    <img
      src="/images/hero/E.png"
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
      src="/images/hero/Nom-log.png"
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
  {t('nav.carta_btn')}
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
  {t('nav.reservas')}
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
    letterSpacing: '0.25em',
    whiteSpace: 'nowrap', 
  }}
  className="hover:text-white transition-colors"
>
   {t('hero.address')}
</a>
      <p
        style={{
          fontSize: '13px',
          fontWeight: '600',
          color: '#D9D9D9',
          letterSpacing: '0.25em',
        }}
      >
      {t('hero.schedule')}
      </p>
      <a
        href="https://www.instagram.com/casavendrell/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontSize: '13px',
          fontWeight: '600',
          color: '#D9D9D9',
          letterSpacing: '0.25em',
          marginTop: '8px',
        }}
      >
         {t('hero.instagram')}
      </a>
    </div>

  </div>
)}

{/* ===== MENÚ MÓVIL — OVERLAY PANTALLA COMPLETA ===== */}
<div
  style={{
    backgroundColor: '#411F10',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
    transition: 'transform 0.35s ease-in-out',
    visibility: menuOpen ? 'visible' : 'hidden',
  }}
  className="md:hidden flex flex-col px-8 py-8"
>
  {/* Header con cerrar */}
<div className="flex justify-between items-center" style={{ marginBottom: '60px' }}>
  <Link to="/" onClick={() => setMenuOpen(false)}>
    <img
      src={isMenu ? '/images/hero/Nom-log.png' : '/images/hero/Logo-Izq.png'}
      alt="Casa Vèndrell"
      style={{ height: '16px' }}
    />
  </Link>
  <button
    onClick={() => setMenuOpen(false)}
    style={{ color: '#FFFFFF', fontSize: '28px', lineHeight: '1' }}
    aria-label="Cerrar menú"
  >
    ✕
  </button>
</div>

  {/* Links */}
  <nav className="flex flex-col" style={{ gap: '32px' }}>
    {NAV_LINKS.map(link => (
      <Link
        key={link.path}
        to={link.path}
        onClick={() => setMenuOpen(false)}
        style={{
          fontSize: '22px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: location.pathname === link.path ? '#C65427' : '#D9D9D9',
          paddingBottom: '16px',
          borderBottom: '1px solid rgba(217,217,217,0.15)',
        }}
      >
        {link.label}
      </Link>
    ))}
  </nav>

  {/* Idiomas */}
  <div
    className="flex gap-8"
    style={{ marginTop: 'auto', paddingTop: '32px', borderTop: '1px solid rgba(217,217,217,0.2)' }}
  >
    {LANGUAGES.map(lang => (
      <button
        key={lang.code}
        onClick={() => {
          changeLanguage(lang.code)
          setMenuOpen(false)
        }}
        style={{
          fontSize: '14px',
          letterSpacing: '0.15em',
          color: language === lang.code ? '#C65427' : 'rgba(217,217,217,0.6)',
        }}
      >
        {lang.label}
      </button>
    ))}
  </div>
</div>
    </header>
  )
}