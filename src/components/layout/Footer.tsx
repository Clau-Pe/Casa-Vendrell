import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer style={{ backgroundColor: '#411F10' }} className="w-full">

      {/* CONTENIDO PRINCIPAL */}
      <div style={{ maxWidth: '930px', margin: '0 auto', padding: '72px 24px 56px 24px' }}>

        {/* LOGO */}
        <div style={{ marginBottom: '40px' }}>
          <img src="/images/hero/Nom-log.png" alt="Casa Vèndrell" className="h-5 object-contain object-left" />
        </div>

        {/* COLUMNAS — apiladas en móvil, en fila en desktop */}
        <div className="flex flex-col md:flex-row md:justify-between items-start gap-10 md:gap-0">

          {/* IZQUIERDA — Contacto */}
          <div className="flex flex-col gap-2">
            <p style={{ fontSize: '13px', color: '#D9D9D9', letterSpacing: '0.2em', lineHeight: '160%', marginBottom: '8px' }}>
              {t('footer.contacto')}
            </p>
            <a href="https://www.google.com/maps/place/Casa+Vendrell/@41.3815743,2.1555104,17z/data=!3m1!4b1!4m6!3m5!1s0x12a4a3bce7b09e63:0x39566abfb8e426fb!8m2!3d41.3815743!4d2.1555104!16s%2Fg%2F11xhbhpkvy"
              target="_blank" rel="noopener noreferrer"
              style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: '180%' }}
              className="hover:text-white transition-colors">
              Diputació 110. 08015 Barcelona
            </a>
            <a href="tel:+34634938879"
              style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: '180%' }}
              className="hover:text-white transition-colors">
              +34 634 938 879
            </a>
            <a href="mailto:info@casavendrell.com"
              style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: '180%' }}
              className="hover:text-white transition-colors">
              info@casavendrell.com
            </a>
          </div>

          {/* DERECHA — Síguenos + El Bar */}
          <div className="flex gap-16">

            {/* Síguenos */}
            <div className="flex flex-col gap-2">
              <p style={{ fontSize: '13px', color: '#D9D9D9', letterSpacing: '0.2em', lineHeight: '160%', marginBottom: '8px' }}>
                {t('footer.siguenos')}
              </p>
              <a href="https://www.instagram.com/casavendrell/" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: '180%', textDecoration: 'underline' }}
                className="hover:text-white transition-colors">Instagram</a>
              <a href="https://www.facebook.com/profile.php?id=61581610967847" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: '180%', textDecoration: 'underline' }}
                className="hover:text-white transition-colors">Facebook</a>
              <a href="https://www.google.com/maps/place/Casa+Vendrell/@41.3815743,2.1555104,17z/data=!3m1!4b1!4m6!3m5!1s0x12a4a3bce7b09e63:0x39566abfb8e426fb!8m2!3d41.3815743!4d2.1555104!16s%2Fg%2F11xhbhpkvy" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: '180%', textDecoration: 'underline' }}
                className="hover:text-white transition-colors">Google Maps</a>
            </div>

            {/* El Bar */}
            <div className="flex flex-col gap-2">
              <a
                href="/"
                style={{ fontSize: '14px', color: '#D9D9D9', letterSpacing: '0.2em', lineHeight: '180%', textDecoration: 'none' }}>
                {t('footer.el_bar')}
              </a>
              <a
                href="/#consultoria"
                style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.2em', lineHeight: '180%' }}
                className="hover:text-white transition-colors">
                {t('footer.consultoria')}
              </a>
              <Link to="/carta"
                style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.2em', lineHeight: '180%' }}
                className="hover:text-white transition-colors">
                {t('footer.nuestra_carta')}
              </Link>
              <a href="https://wa.me/34634938879" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.2em', lineHeight: '180%' }}
                className="hover:text-white transition-colors">
                {t('footer.reservas')}
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* SEPARADOR — ancho completo */}
      <div style={{ borderTop: '1px solid rgba(217,217,217,0.2)' }} />

      {/* COPYRIGHT */}
      <div style={{ maxWidth: '930px', margin: '0 auto', padding: '20px 24px' }}
        className="flex items-center justify-between">
        <p style={{ fontSize: '13px', color: 'rgba(217,217,217,0.6)', lineHeight: '160%' }}>
          {t('footer.rights')}
        </p>
        <Link to="/admin/login" title="Administración" className="hover:opacity-100 transition-opacity">
          <img src="/images/hero/Icon-Admin.png" alt="Administración" style={{ width: '26px', height: '26px' }} />
        </Link>
      </div>

    </footer>
  )
}