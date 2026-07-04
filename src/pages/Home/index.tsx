import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getConsultoriaMailLink } from '../../utils/contact'

export default function Home() {
  const { t } = useTranslation()

  return (
    <main style={{ backgroundColor: '#FAFAFA' }}>

      {/* ===== GRID FOTOS HERO ===== */}
      <section
        style={{ backgroundColor: '#411F10' }}
        className="w-full grid grid-cols-2 gap-1 px-1"
      >
        <img
          src="/images/hero/body1.png"
          alt="Casa Vendrell interior"
          className="w-full object-cover"
          style={{ aspectRatio: '836/1024' }}
        />
        <img
          src="/images/hero/bODY2.png"
          alt="Casa Vendrell vinos"
          className="w-full object-cover"
          style={{ aspectRatio: '836/1024' }}
        />
      </section>

      {/* ===== HISTORIA ===== */}
<section className="w-full flex flex-col items-center bg-white px-4" style={{ paddingTop: '96px', paddingBottom: '96px' }}>
  <h2
    className="text-center mb-10 md:mb-14"
    style={{
      fontSize: 'clamp(16px, 3vw, 24px)',
      fontWeight: '600',
      color: '#411F10',
      letterSpacing: '0.25em',
      lineHeight: '120%',
      paddingTop: '170px', 
      paddingBottom: '96px'
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
  <div className="w-full max-w-xl px-4 mt-12 md:mt-16 text-center">
    <p style={{ fontSize: '16px', fontWeight: '500', color: '#000000', lineHeight: '160%',  marginTop: '65px'}}>
      {t('home.historia_p1')}
    </p>
    <p style={{ fontSize: '16px', fontWeight: '500', color: '#000000', lineHeight: '160%', marginTop: '24px', paddingBottom: '338px' }}>
      {t('home.historia_p2')}
    </p>
  </div>
</section>

{/* ===== NUESTRA CARTA ===== */}
<section className="w-full flex flex-col items-center bg-white px-4" style={{ paddingBottom: '490px' }}>
  <h2
    className="text-center mb-10"
    style={{
      fontSize: 'clamp(16px, 3vw, 24px)',
      fontWeight: '600',
      color: '#411F10',
      letterSpacing: '0.25em',
      lineHeight: '120%',
      marginBottom: '66px'
    }}
  >
    {t('home.nuestra_carta_title')}
  </h2>
<div className="flex flex-col items-center" style={{ gap: '44px' }}>
  <Link
    to="/carta"
    state={{ openCategory: 'vinos_por_copa' }}
    className="hover:opacity-70 transition-opacity flex items-center gap-1"
    style={{ fontSize: '14px', fontWeight: '600', color: '#411F10', letterSpacing: '0.25em', lineHeight: '160%', textDecoration: 'none' }}
  >
    <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>
      {t('home.vinos_por_copa')}
    </span>
    <span style={{ display: 'inline-block', transform: 'rotate(45deg)' }}>↑</span>
  </Link>
  <Link
    to="/carta"
    className="hover:opacity-70 transition-opacity flex items-center gap-1"
    style={{ fontSize: '14px', fontWeight: '600', color: '#411F10', letterSpacing: '0.25em', lineHeight: '160%', textDecoration: 'none' }}
  >
    <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>
      {t('home.carta_completa')}
    </span>
    <span style={{ display: 'inline-block', transform: 'rotate(45deg)' }}>↑</span>
  </Link>
</div>
</section>

{/* ===== MAPA ===== */}
<section className="w-full flex flex-col items-center bg-white py-16 md:py-24 px-4">
  <div
    className="w-full"
    style={{ maxWidth: '1061px', height: 'clamp(250px, 40vw, 569px)', boxShadow: '0px 4px 24px rgba(0,0,0,0.15)' }}
  >
    <iframe
      title="Ubicación Casa Vèndrell"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.8!2d2.1529301!3d41.3815743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a3bce7b09e63%3A0x39566abfb8e426fb!2sCasa%20Vendrell!5e0!3m2!1ses!2ses!4v1"
      width="100%"
      height="100%"
      style={{ border: 0, display: 'block' }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  </div>
  <div className="flex flex-col items-center text-center mt-10 gap-3">
    <a
      href="https://www.google.es/maps/place/Casa+Vendrell/@41.3815743,2.1529301,17z"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-[#411F10] transition-colors"
      style={{ fontSize: '13px', fontWeight: '600', color: '#6A6A6A', letterSpacing: '0.25em' }}
    >
      {t('home.address')}
    </a>
    <a
      href="tel:+34634938879"
      className="hover:text-[#411F10] transition-colors"
      style={{ fontSize: '13px', fontWeight: '600', color: '#6A6A6A', letterSpacing: '0.25em' }}
    >
      {t('home.phone')}
    </a>
    <a
      href="mailto:reservas.casavendrell@gmail.com"
      className="hover:text-[#411F10] transition-colors"
      style={{ fontSize: '13px', fontWeight: '600', color: '#6A6A6A', letterSpacing: '0.25em' }}
    >
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
<section className="w-full flex flex-col items-center bg-white py-16 md:py-24 px-4">
  <h2
    className="text-center mb-10"
    style={{
      fontSize: 'clamp(16px, 3vw, 24px)',
      fontWeight: '600',
      color: '#411F10',
      letterSpacing: '0.25em',
      lineHeight: '120%',
    }}
  >
    {t('home.consultoria_title')}
  </h2>
  <div className="w-full max-w-xl text-center mb-10">
    <p style={{ fontSize: '16px', fontWeight: '500', color: '#411F10', lineHeight: '160%' }}>
     {t('home.consultoria_p1')}
    </p>
    <p style={{ fontSize: '16px', fontWeight: '500', color: '#411F10', lineHeight: '160%', marginTop: '24px' }}>
      {t('home.consultoria_p2')}
    </p>
  </div>
  <div className="flex flex-col items-center gap-3">
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

{/* ===== CTA RESERVAS ===== */}
<section
  className="w-full py-16 md:py-24 px-4 flex flex-col items-center gap-8 text-center"
  style={{ backgroundColor: '#411F10' }}
>
  <p style={{ fontSize: '13px', fontWeight: '600', color: 'rgba(217,217,217,0.7)', letterSpacing: '0.25em' }}>
    {t('home.cta_text')}
  </p>
  <a
    href="https://wa.me/34634938879"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:opacity-90 transition-opacity"
    style={{ backgroundColor: '#C65427', color: '#FFFFFF', fontSize: '13px', fontWeight: '600', letterSpacing: '0.25em', padding: '12px 48px' }}
  >
    {t('home.whatsapp_btn')}
  </a>
</section>

      {/* ===== NEWSLETTER ===== */}
      <section
        className="w-full flex justify-center items-center py-12 md:py-16"
        style={{ backgroundColor: '#411F10' }}
      >
        <div
          className="flex flex-col items-center gap-6 mx-4"
          style={{
            backgroundColor: '#FFFFFF',
            width: '100%',
            maxWidth: '930px',
            padding: 'clamp(24px, 4vw, 48px) clamp(16px, 4vw, 40px)',
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
            className="flex items-center w-full"
            style={{ maxWidth: '400px' }}
            onSubmit={e => e.preventDefault()}
          >
            <input
              type="email"
              placeholder=""
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
          </form>
        </div>
      </section>

    </main>
  )
}