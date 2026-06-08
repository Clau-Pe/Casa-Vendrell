import { Link } from 'react-router-dom'
import {getConsultoriaMailLink } from '../../utils/contact'

export default function Home() {


  return (
    <main style={{ backgroundColor: '#FAFAFA' }}>

{/* ===== GRID FOTOS HERO — 2 columnas portrait ===== */}
<section
  style={{ backgroundColor: '#411F10', paddingLeft: '19px', paddingRight: '19px', paddingTop: '8px', paddingBottom: '8px' }}
  className="w-full grid grid-cols-2 gap-2"
>
  <img
    src="public/images/hero/bODY1.png"
    alt="Casa Vèndrell interior"
    className="w-full object-cover"
    style={{ aspectRatio: '836/1024' }}
  />
  <img
    src="public/images/hero/bODY2.png"
    alt="Casa Vèndrell vinos"
    className="w-full object-cover"
    style={{ aspectRatio: '830/1024' }}
  />
</section>

{/* ===== HISTORIA ===== */}
<section className="w-full flex flex-col items-center bg-white" style={{ paddingTop: '48px' }}>
  
  {/* TÍTULO CASA VÈNDRELL */}
  <h2
    style={{
      fontSize: '24px',
      fontWeight: '600',
      color: '#411F10',
      letterSpacing: '0.25em',
      lineHeight: '120%',
      marginBottom: '40px',
      width: 'nowrap',
      textAlign: 'center',
    }}
  >
    CASA VENDRELL
  </h2>

  <img
    src="public/images/hero/bODY3.png"
    alt="Casa Vèndrell"
    className="w-full object-cover"
    style={{ aspectRatio: '1061/569', maxWidth: '1061px' }}
  />

 {/* TEXTO HISTORIA */}
<div
  style={{
    width: '574px',
    marginTop: '40px',
    marginBottom: '40px',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  }}
>
  <p
    style={{
      fontSize: '16px',
      fontWeight: '500',
      color: '#000000',
      lineHeight: '160%',
      letterSpacing: '0',
    }}
  >
    Casa Vendrell nace en una antigua bodega de 1934 restaurada, donde cada decisión buscó preservar la esencia y los elementos originales del espacio. El resultado es un lugar con historia propia, en el corazón de l'Eixample.
  </p>
  <p
    style={{
      fontSize: '16px',
      fontWeight: '500',
      color: '#000000',
      lineHeight: '160%',
      letterSpacing: '0',
      marginTop: '16px',
    }}
  >
    Un bar de vinos atendido por sus propios dueños, apasionados y enfocados en guiar la experiencia en cada visita. Una gran selección de vinos y una carta de tapas donde cada plato acompaña y complementa al protagonista.
  </p>
</div>
</section>

{/* ===== NUESTRA CARTA ===== */}
<section className="w-full flex flex-col items-center bg-white" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
  
  {/* TÍTULO */}
  <h2
    style={{
      fontSize: '24px',
      fontWeight: '600',
      color: '#411F10',
      letterSpacing: '0.25em',
      lineHeight: '120%',
      whiteSpace: 'nowrap',
      marginBottom: '24px',
    }}
  >
    NUESTRA CARTA
  </h2>

  {/* LINKS */}
  <div className="flex flex-col items-center" style={{ gap: '8px' }}>
    <Link
      to="/carta?categoria=vinos_copa"
      style={{
        fontSize: '14px',
        fontWeight: '600',
        color: '#411F10',
        letterSpacing: '0.25em',
        lineHeight: '160%',
        textDecoration: 'underline',
        textUnderlineOffset: '3px',
      }}
      className="hover:opacity-70 transition-opacity flex items-center gap-1"
    >
      VINOS POR COPA
      <span style={{ display: 'inline-block', transform: 'rotate(45deg)', fontSize: '14px' }}>
        ↑
      </span>
    </Link>

    <Link
      to="/carta"
      style={{
        fontSize: '14px',
        fontWeight: '600',
        color: '#411F10',
        letterSpacing: '0.25em',
        lineHeight: '160%',
        textDecoration: 'underline',
        textUnderlineOffset: '3px',
      }}
      className="hover:opacity-70 transition-opacity flex items-center gap-1"
    >
      CARTA COMPLETA
      <span style={{ display: 'inline-block', transform: 'rotate(45deg)', fontSize: '14px' }}>
        ↑
      </span>
    </Link>
  </div>
</section>

{/* ===== MAPA ===== */}
<section className="w-full flex flex-col items-center bg-white" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
  <div
    style={{
      width: '1061px',
      height: '569px',
      maxWidth: '100%',
      boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.15)',
    }}
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

  {/* INFO DEBAJO DEL MAPA */}
  <div
    className="flex flex-col items-center text-center"
    style={{ marginTop: '32px', gap: '6px' }}
  >
    <a
      href="https://www.google.es/maps/place/Casa+Vendrell/@41.3815743,2.1529301,17z"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontSize: '13px',
        fontWeight: '600',
        color: '#6A6A6A',
        letterSpacing: '0.25em',
      }}
      className="hover:text-[#411F10] transition-colors"
    >
      DIPUTACIÓ 110. 08015 BARCELONA
    </a>
    <a
      href="https://wa.me/34634938879"
      style={{
        fontSize: '13px',
        fontWeight: '600',
        color: '#6A6A6A',
        letterSpacing: '0.25em',
      }}
    >
      +34 634 938 879
    </a>
    <a
      href="mailto:info.casavendrell@gmail.com"
      style={{
        fontSize: '13px',
        fontWeight: '600',
        color: '#6A6A6A',
        letterSpacing: '0.25em',
      }}
      className="hover:text-[#411F10] transition-colors"
    >
      INFO.CASAVENDRELL@GMAIL.COM
    </a>
  </div>
</section>

{/* ===== GALERÍA ===== */}
<section className="w-full grid grid-cols-2 md:grid-cols-4 gap-2 px-2">
  {['foto-galeria-1', 'foto-galeria-2', 'foto-galeria-3', 'foto-galeria-4'].map(foto => (
    <img
      key={foto}
      src={`public/images/gallery/${foto}.png`}
      alt={`Casa Vèndrell ${foto}`}
      className="w-full object-cover"
      style={{ aspectRatio: '414/698' }}
    />
  ))}
</section>

     {/* ===== CONSULTORÍA ===== */}
<section className="w-full flex flex-col items-center bg-white" style={{ paddingTop: '60px', paddingBottom: '60px' }}>

  {/* TÍTULO */}
  <h2
    style={{
      fontSize: '24px',
      fontWeight: '600',
      color: '#411F10',
      letterSpacing: '0.25em',
      lineHeight: '120%',
      whiteSpace: 'nowrap',
      marginBottom: '28px',
    }}
  >
    CONSULTORÍA
  </h2>

  {/* TEXTO DOS PÁRRAFOS */}
  <div
    style={{
      width: '572px',
      maxWidth: '100%',
      textAlign: 'center',
      marginBottom: '28px',
    }}
  >
    <p
      style={{
        fontSize: '16px',
        fontWeight: '500',
        color: '#411F10',
        lineHeight: '160%',
        letterSpacing: '0',
      }}
    >
      Casa Vendrell surge de la suma de miradas distintas sobre un mismo objetivo.
    </p>
    <p
      style={{
        fontSize: '16px',
        fontWeight: '500',
        color: '#411F10',
        lineHeight: '160%',
        letterSpacing: '0',
        marginTop: '16px',
      }}
    >
      Esa misma visión es la que ofrecemos a quienes quieran dar vida a un proyecto propio: desde la idea inicial hasta la puesta en marcha, acompañando cada etapa del proceso con criterio, experiencia y sensibilidad.
    </p>
  </div>

  {/* CONTACTO */}
  <div
    style={{
      width: '286px',
      maxWidth: '100%',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
    }}
  >
    <a
      href={getConsultoriaMailLink()}
      style={{
        fontSize: '16px',
        fontWeight: '400',
        color: '#411F10',
        lineHeight: '160%',
        letterSpacing: '0',
        textDecoration: 'underline',
        textUnderlineOffset: '3px',
      }}
      className="hover:opacity-70 transition-opacity"
    >
      Contáctanos
    </a>
    <a
      href="mailto:cuatrouvassl@gmail.com"
      style={{
        fontSize: '13px',
        fontWeight: '600',
        color: '#411F10',
        lineHeight: '160%',
        letterSpacing: '0.25em',
        textDecoration: 'underline',
        textUnderlineOffset: '3px',
      }}
      className="hover:opacity-70 transition-opacity"
    >
      CUATROUVASSL@GMAIL.COM
    </a>
  </div>

</section>

{/* ===== NEWSLETTER ===== */}
<section className="w-full" style={{ backgroundColor: '#FAFAFA' }}>
  <div
    className="w-full flex justify-center items-center"
    style={{
      background: 'linear-gradient(to bottom, #FAFAFA 50%, #411F10 50%)',
      padding: '0 0 0 0',
    }}
  >
    <div
      className="flex flex-col items-center gap-8"
      style={{
        backgroundColor: '#FFFFFF',
        width: '930px',
        maxWidth: '95%',
        padding: '48px 40px',
        boxShadow: '0px 4px 24px rgba(0,0,0,0.15)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <p
        style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#411F10',
          letterSpacing: '0.25em',
          lineHeight: '120%',
          textAlign: 'center',
        }}
      >
        DEJA TU EMAIL PARA RECIBIR NUESTRAS NOVEDADES
      </p>
      <form
        className="flex items-center"
        style={{ width: '400px', maxWidth: '100%' }}
        onSubmit={e => e.preventDefault()}
      >
        <input
          type="email"
          placeholder=""
          className="flex-1 outline-none"
          style={{
            height: '42px',
            border: '1px solid #D9D9D9',
            borderRight: 'none',
            padding: '0 12px',
            fontSize: '14px',
            color: '#333333',
          }}
        />
        <button
          type="submit"
          style={{
            height: '42px',
            backgroundColor: '#C65427',
            color: '#FFFFFF',
            fontSize: '13px',
            fontWeight: '600',
            letterSpacing: '0.25em',
            padding: '0 24px',
            border: 'none',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
          className="hover:opacity-90 transition-opacity"
        >
          ENVIAR
        </button>
      </form>
    </div>
  </div>
</section>
    </main>
  )
}