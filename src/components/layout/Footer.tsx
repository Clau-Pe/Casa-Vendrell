import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#411F10' }} className="w-full">

      {/* CONTENIDO PRINCIPAL */}
      <div
        className="w-full flex justify-between"
        style={{ padding: '60px 333px 48px 333px' }}
      >
        {/* COLUMNA IZQUIERDA */}
        <div className="flex flex-col">

          {/* LOGO TEXTO */}
          <img
            src="/images/hero/Nom-log.png"
            alt="Casa Vèndrell"
            style={{ width: '194px', height: '21.46px' }}
          />

          {/* CONTACTO TÍTULO */}
          <p
            style={{
              fontSize: '14px',
              fontWeight: '400',
              color: '#D9D9D9',
              letterSpacing: '0.25em',
              lineHeight: '160%',
              marginTop: '28px',
            }}
          >
            CONTACTO
          </p>

          {/* DATOS CONTACTO */}
          <div
            style={{
              width: '204px',
              marginTop: '8px',
            }}
          >
            <a
              href="https://www.google.es/maps/place/Casa+Vendrell/@41.3815743,2.1529301,17z"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '14px',
                fontWeight: '400',
                color: '#FFFFFF',
                letterSpacing: '0',
                lineHeight: '160%',
                display: 'block',
              }}
              className="hover:opacity-70 transition-opacity"
            >
              Diputació 110. 08015 Barcelona
            </a>
            <a
              href="tel:+34634938879"
              style={{
                fontSize: '14px',
                fontWeight: '400',
                color: '#FFFFFF',
                letterSpacing: '0',
                lineHeight: '160%',
                display: 'block',
              }}
              className="hover:opacity-70 transition-opacity"
            >
              +34 634 938 879
            </a>
            <a
              href="mailto:reservas.casavendrell@gmail.com"
              style={{
                fontSize: '14px',
                fontWeight: '400',
                color: '#FFFFFF',
                letterSpacing: '0',
                lineHeight: '160%',
                display: 'block',
              }}
              className="hover:opacity-70 transition-opacity"
            >
              info@casavendrell.com
            </a>
          </div>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="flex gap-20">

          {/* SÍGUENOS */}
          <div className="flex flex-col">
            <p
              style={{
                fontSize: '14px',
                fontWeight: '400',
                color: '#D9D9D9',
                letterSpacing: '0.25em',
                lineHeight: '160%',
              }}
            >
              SÍGUENOS
            </p>
            <div
              style={{ marginTop: '8px', width: '84px' }}
            >
            <a  
                href="https://www.instagram.com/casavendrell/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '14px',
                  fontWeight: '400',
                  color: '#FFFFFF',
                  letterSpacing: '0',
                  lineHeight: '160%',
                  display: 'block',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                }}
                className="hover:opacity-70 transition-opacity"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61581610967847"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '14px',
                  fontWeight: '400',
                  color: '#FFFFFF',
                  letterSpacing: '0',
                  lineHeight: '160%',
                  display: 'block',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                }}
                className="hover:opacity-70 transition-opacity"
              >
                Facebook
              </a>
              <a
                href="https://www.google.es/maps/place/Casa+Vendrell/@41.3815743,2.1529301,17z"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '14px',
                  fontWeight: '400',
                  color: '#FFFFFF',
                  letterSpacing: '0',
                  lineHeight: '160%',
                  display: 'block',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                }}
                className="hover:opacity-70 transition-opacity"
              >
                Google Maps
              </a>
            </div>
          </div>

          {/* NAV LINKS */}
          <div className="flex flex-col" style={{ width: '200px' }}>
            {[
              { path: '/', label: 'EL BAR' },
              { path: '/contacto', label: 'CONSULTORÍA' },
              { path: '/carta', label: 'NUESTRA CARTA' },
              { path: '/contacto', label: 'RESERVAS' },
            ].map(link => (
              <Link
                key={link.label}
                to={link.path}
                style={{
                  fontSize: '14px',
                  fontWeight: '400',
                  color: '#D9D9D9',
                  letterSpacing: '0.25em',
                  lineHeight: '160%',
                }}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* LÍNEA SEPARADORA */}
      <div
        style={{
          borderTop: '1px solid rgba(217,217,217,0.2)',
          margin: '0 333px',
        }}
      />

      {/* PIE DE PÁGINA */}
      <div
        className="flex items-center justify-between"
        style={{ padding: '16px 333px' }}
      >
        <p
          style={{
            fontSize: '14px',
            fontWeight: '500',
            color: 'rgba(217,217,217,0.7)',
            letterSpacing: '0',
            lineHeight: '160%',
          }}
        >
          ®2026 Casa Vendrell
        </p>
        <Link
          to="/admin/login"
          title="Administración"
          className="hover:opacity-100 transition-opacity"
        >
          <img
            src="/images/hero/Icon-Admin.png"
            alt="Administración"
            style={{ width: '26px', height: '26px' }}
          />
        </Link>
      </div>
    </footer>
  )
}