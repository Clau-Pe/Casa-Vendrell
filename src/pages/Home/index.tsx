import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getConsultoriaMailLink } from '../../utils/contact'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Home() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'duplicate'>('idle')

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email })
    if (error) {
      if (error.code === '23505') setStatus('duplicate')
      else setStatus('error')
    } else {
      setStatus('success')
      setEmail('')
    }
  }

  return (
    <main style={{ backgroundColor: '#411F10' }}>

      {/* ===== GRID FOTOS HERO ===== */}
      <section
        style={{ backgroundColor: '#411F10', marginTop: 'clamp(48px, 8vw, 120px)' }}
        className="w-full grid grid-cols-2 gap-1 px-1"
      >
        <img src="/images/hero/body1.png" alt="Casa Vèndrell interior" className="w-full object-cover" style={{ aspectRatio: '836/1024' }} />
        <img src="/images/hero/bODY2.png" alt="Casa Vèndrell vinos" className="w-full object-cover" style={{ aspectRatio: '836/1024' }} />
      </section>

      {/* ===== HISTORIA ===== */}
      <section className="w-full flex flex-col items-center bg-white px-4">
        <h2
          className="text-center"
          style={{
            fontSize: 'clamp(14px, 3vw, 24px)',
            fontWeight: '600',
            color: '#411F10',
            letterSpacing: '0.25em',
            lineHeight: '120%',
            marginTop: 'clamp(48px, 9vw, 170px)',
            marginBottom: 'clamp(32px, 5vw, 65px)',
          }}
        >
          {t('home.casa_vendrell_title')}
        </h2>
        <img
          src="/images/hero/bODY3.png"
          alt="Casa Vèndrell"
          className="w-full object-cover"
          style={{ aspectRatio: '1061/569', maxWidth: '1061px' }}
        />
        <div className="w-full max-w-xl px-4 text-center" style={{ marginTop: 'clamp(32px, 5vw, 65px)' }}>
          <p style={{ fontSize: 'clamp(14px, 2vw, 16px)', fontWeight: '500', color: '#000000', lineHeight: '160%' }}>
            {t('home.historia_p1')}
          </p>
          <p style={{ fontSize: 'clamp(14px, 2vw, 16px)', fontWeight: '500', color: '#000000', lineHeight: '160%', marginTop: '24px', marginBottom: 'clamp(48px, 18vw, 338px)' }}>
            {t('home.historia_p2')}
          </p>
        </div>
      </section>

      {/* ===== NUESTRA CARTA ===== */}
      <section className="w-full flex flex-col items-center bg-white px-4" style={{ paddingBottom: 'clamp(64px, 26vw, 490px)' }}>
        <h2
          className="text-center"
          style={{
            fontSize: 'clamp(14px, 3vw, 24px)',
            fontWeight: '600',
            color: '#411F10',
            letterSpacing: '0.25em',
            lineHeight: '120%',
            marginBottom: 'clamp(32px, 4vw, 66px)',
          }}
        >
          {t('home.nuestra_carta_title')}
        </h2>
        <div className="flex flex-col items-center" style={{ gap: 'clamp(24px, 3vw, 44px)' }}>
          <Link
            to="/carta"
            state={{ openCategory: 'vinos_por_copa' }}
            className="hover:opacity-70 transition-opacity flex items-center gap-1"
            style={{ fontSize: '14px', fontWeight: '600', color: '#411F10', letterSpacing: '0.25em', lineHeight: '160%', textDecoration: 'none' }}
          >
            <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>{t('home.vinos_por_copa')}</span>
            <span style={{ display: 'inline-block', transform: 'rotate(45deg)' }}>↑</span>
          </Link>
          <Link
            to="/carta"
            className="hover:opacity-70 transition-opacity flex items-center gap-1"
            style={{ fontSize: '14px', fontWeight: '600', color: '#411F10', letterSpacing: '0.25em', lineHeight: '160%', textDecoration: 'none' }}
          >
            <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>{t('home.carta_completa')}</span>
            <span style={{ display: 'inline-block', transform: 'rotate(45deg)' }}>↑</span>
          </Link>
        </div>
      </section>

      {/* ===== MAPA ===== */}
      <section className="w-full flex flex-col items-center bg-white px-4" style={{ paddingTop: 'clamp(32px, 5vw, 96px)', paddingBottom: '0' }}>
        <div
          className="w-full"
          style={{ maxWidth: '1061px', height: 'clamp(200px, 40vw, 569px)', position: 'relative'  }}
        >
          <iframe
            title="Ubicación Casa Vèndrell"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.6552519483666!2d2.152930112121831!3d41.38157427118095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a3bce7b09e63%3A0x39566abfb8e426fb!2sCasa%20Vendrell!5e0!3m2!1ses-419!2ses!4v1783970990838!5m2!1ses-419!2ses" 
            width="100%"
            height="100%"
            style={{ border: 0, display: 'block', filter: 'grayscale(70%)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
         {/* Overlay clicable */}
  
    <a 
    href="https://www.google.com/maps/place/Casa+Vendrell/@41.3815743,2.1555104,17z/data=!3m1!4b1!4m6!3m5!1s0x12a4a3bce7b09e63:0x39566abfb8e426fb!8m2!3d41.3815743!4d2.1555104!16s%2Fg%2F11xhbhpkvy"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'block',
      zIndex: 1,
    }}
    aria-label="Abrir en Google Maps"
  />
    
        </div>
        <div
          className="flex flex-col items-center text-center gap-3"
          style={{ marginTop: 'clamp(24px, 3vw, 47px)', marginBottom: 'clamp(48px, 10vw, 182px)' }}
        >
          <a href="https://www.google.com/maps/place/Casa+Vendrell/@41.3815743,2.1555104,17z/data=!3m1!4b1!4m6!3m5!1s0x12a4a3bce7b09e63:0x39566abfb8e426fb!8m2!3d41.3815743!4d2.1555104!16s%2Fg%2F11xhbhpkvy" target="_blank" rel="noopener noreferrer" className="hover:text-[#411F10] transition-colors" style={{ fontSize: '13px', fontWeight: '600', color: '#6A6A6A', letterSpacing: '0.25em' }}>
            {t('home.address')}
          </a>
          <a 
           href="https://wa.me/34634938879" 
           target="_blank"
           rel="noopener noreferrer"
           className="hover:text-[#411F10] transition-colors" 
          style={{ fontSize: '13px', fontWeight: '600', color: '#6A6A6A', letterSpacing: '0.25em' }}
          >
  {t('home.phone')}
</a>
          <a href="mailto:reservas.casavendrell@gmail.com" className="hover:text-[#411F10] transition-colors" style={{ fontSize: '13px', fontWeight: '600', color: '#6A6A6A', letterSpacing: '0.25em' }}>
            {t('home.email')}
          </a>
        </div>
      </section>

      {/* ===== GALERÍA ===== */}
      <section className="w-full grid grid-cols-2 md:grid-cols-4 gap-1 px-1">
        {['foto-galeria-1', 'foto-galeria-2', 'foto-galeria-3', 'foto-galeria-4'].map(foto => (
          <img
            key={foto}
            src={`/images/gallery/${foto}.png`}
            alt={`Casa Vèndrell ${foto}`}
            className="w-full object-cover"
            style={{ aspectRatio: '414/698' }}
          />
        ))}
      </section>

      {/* ===== CONSULTORÍA ===== */}
      <section id="consultoria" className="w-full flex flex-col items-center bg-white px-4" style={{ paddingTop: 'clamp(48px, 7vw, 123px)', paddingBottom: 'clamp(48px, 5vw, 96px)' }}>
        <h2
          className="text-center"
          style={{
            fontSize: 'clamp(14px, 3vw, 24px)',
            fontWeight: '600',
            color: '#411F10',
            letterSpacing: '0.25em',
            lineHeight: '120%',
            marginBottom: 'clamp(16px, 2vw, 29px)',
          }}
        >
          {t('home.consultoria_title')}
        </h2>
        <div className="w-full max-w-xl text-center">
          <p style={{ fontSize: 'clamp(14px, 2vw, 16px)', fontWeight: '500', color: '#411F10', lineHeight: '160%' }}>
            {t('home.consultoria_p1')}
          </p>
          <p style={{ fontSize: 'clamp(14px, 2vw, 16px)', fontWeight: '500', color: '#411F10', lineHeight: '160%', marginTop: '24px' }}>
            {t('home.consultoria_p2')}
          </p>
        </div>
        <div className="flex flex-col items-center" style={{ gap: '16px', marginTop: 'clamp(24px, 2vw, 29px)' }}>
          <a
            href={getConsultoriaMailLink()}
            className="hover:opacity-70 transition-opacity"
            style={{ fontSize: '16px', fontWeight: '400', color: '#411F10', lineHeight: '160%', textDecoration: 'underline', textUnderlineOffset: '3px' }}
          >
            {t('home.contactanos')}
          </a>
          <a
            href="mailto:cuatrouvassl@gmail.com"
            className="hover:opacity-70 transition-opacity"
            style={{ fontSize: '13px', fontWeight: '600', color: '#411F10', lineHeight: '160%', letterSpacing: '0.25em', textDecoration: 'underline', textUnderlineOffset: '3px' }}
          >
            CUATROUVASSL@GMAIL.COM
          </a>
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section
        className="w-full flex justify-center items-center"
        style={{
          background: 'linear-gradient(to bottom, #FFFFFF 50%, #411F10 50%)',
          padding: '0 16px',
        }}
      >
        <div
          className="flex flex-col items-center gap-6"
          style={{
            backgroundColor: '#FFFFFF',
            width: '100%',
            maxWidth: '930px',
            padding: 'clamp(24px, 4vw, 48px) clamp(16px, 4vw, 40px)',
            margin: 'clamp(32px, 4vw, 60px) 0',
            boxShadow: '0px 4px 24px rgba(0,0,0,0.15)',
          }}
        >
          <p
            className="text-center"
            style={{ fontSize: 'clamp(11px, 2vw, 14px)', fontWeight: '600', color: '#411F10', letterSpacing: '0.25em', lineHeight: '120%' }}
          >
            {t('home.newsletter_text')}
          </p>
          <form
            className="flex flex-col items-center w-full gap-4"
            style={{ maxWidth: '400px' }}
            onSubmit={handleNewsletter}
          >
            <div className="flex items-center w-full">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t('newsletter.placeholder')}
                className="flex-1 outline-none"
                style={{ height: '42px', border: '1px solid #D9D9D9', borderRight: 'none', padding: '0 12px', fontSize: '14px' }}
              />
              <button
                type="submit"
                className="hover:opacity-90 transition-opacity"
                style={{ height: '42px', backgroundColor: '#C65427', color: '#FFFFFF', fontSize: '13px', fontWeight: '600', letterSpacing: '0.25em', padding: '0 24px', whiteSpace: 'nowrap' }}
              >
                {t('home.newsletter_btn')}
              </button>
            </div>
            {status === 'success' && (
              <p style={{ fontSize: '12px', color: '#C65427', letterSpacing: '0.2em' }}>{t('newsletter.success')}</p>
            )}
            {status === 'duplicate' && (
              <p style={{ fontSize: '12px', color: '#9A8878', letterSpacing: '0.2em' }}>{t('newsletter.duplicate')}</p>
            )}
            {status === 'error' && (
              <p style={{ fontSize: '12px', color: '#C65427', letterSpacing: '0.2em' }}>{t('newsletter.error')}</p>
            )}
          </form>
        </div>
      </section>

    </main>
  )
}