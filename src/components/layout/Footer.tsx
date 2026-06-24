import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#411F10' }} className="w-full">

      {/* CONTENIDO PRINCIPAL */}
      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-8 px-6 md:px-16 py-12">

        {/* COLUMNA 1 — Logo + Contacto */}
        <div className="flex flex-col gap-4">
          <img src="/images/hero/Nom-log.png" alt="Casa Vèndrell" className="h-5 object-contain object-left" />
          <p style={{ fontSize: '14px', fontWeight: '400', color: '#D9D9D9', letterSpacing: '0.25em', lineHeight: '160%', marginTop: '16px' }}>
            CONTACTO
          </p>
          <div className="flex flex-col gap-1">
            <a href="https://www.google.es/maps/place/Casa+Vendrell/@41.3815743,2.1529301,17z" target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: '160%' }} className="hover:text-white transition-colors">Diputació 110. 08015 Barcelona</a>
            <a href="tel:+34634938879" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: '160%' }} className="hover:text-white transition-colors">+34 634 938 879</a>
            <a href="mailto:reservas.casavendrell@gmail.com" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: '160%' }} className="hover:text-white transition-colors">info@casavendrell.com</a>
          </div>
        </div>

        {/* COLUMNA 2 — vacía en desktop, oculta en móvil */}
        <div className="hidden md:block" />

        {/* COLUMNA 3 — Síguenos */}
        <div className="flex flex-col gap-4">
          <p style={{ fontSize: '14px', fontWeight: '400', color: '#D9D9D9', letterSpacing: '0.25em', lineHeight: '160%' }}>SÍGUENOS</p>
          <div className="flex flex-col gap-1">
            <a href="https://www.instagram.com/casavendrell/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: '160%', textDecoration: 'underline' }} className="hover:text-white transition-colors">Instagram</a>
            <a href="https://www.facebook.com/profile.php?id=61581610967847" target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: '160%', textDecoration: 'underline' }} className="hover:text-white transition-colors">Facebook</a>
            <a href="https://www.google.es/maps/place/Casa+Vendrell/@41.3815743,2.1529301,17z" target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: '160%', textDecoration: 'underline' }} className="hover:text-white transition-colors">Google Maps</a>
          </div>
        </div>

        {/* COLUMNA 4 — Nav */}
        <div className="flex flex-col gap-4">
          <p style={{ fontSize: '14px', fontWeight: '400', color: '#D9D9D9', letterSpacing: '0.25em', lineHeight: '160%' }}>EL BAR</p>
          <div className="flex flex-col gap-1">
            {[
              { path: '/contacto', label: 'CONSULTORÍA' },
              { path: '/carta', label: 'NUESTRA CARTA' },
              { path: '/contacto', label: 'RESERVAS' },
            ].map(link => (
              <Link key={link.label} to={link.path} style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em', lineHeight: '160%' }} className="hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* SEPARADOR */}
      <div style={{ borderTop: '1px solid rgba(217,217,217,0.2)', margin: '0 24px' }} className="md:mx-16" />

      {/* COPYRIGHT */}
      <div className="flex items-center justify-between px-6 md:px-16 py-4">
        <p style={{ fontSize: '14px', fontWeight: '500', color: 'rgba(217,217,217,0.7)', lineHeight: '160%' }}>
          ®2026 Casa Vendrell
        </p>
        <Link to="/admin/login" title="Administración" className="hover:opacity-100 transition-opacity">
          <img src="/images/hero/Icon-Admin.png" alt="Administración" style={{ width: '26px', height: '26px' }} />
        </Link>
      </div>
    </footer>
  )
}