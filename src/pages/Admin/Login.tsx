import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ADMINS = [
  { nombre: 'Admin 1', usuario: 'admin1', password: 'casavendrell2026' },
  { nombre: 'Admin 2', usuario: 'admin2', password: 'vendrell2026' },
]

export default function Login() {
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const handleLogin = () => {
    const admin = ADMINS.find(
      a => a.usuario === usuario && a.password === password
    )
    if (admin) {
      localStorage.setItem('admin_auth', 'true')
      localStorage.setItem('admin_nombre', admin.nombre)
      navigate('/admin')
    } else {
      setError(true)
      setPassword('')
    }
  }

  const inputStyle = {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.08)',
    border: error ? '1px solid #C65427' : '1px solid rgba(217,217,217,0.2)',
    color: '#D9D9D9',
    fontFamily: 'Nunito Sans, sans-serif',
    fontSize: '14px',
    padding: '12px 16px',
    textAlign: 'center' as const,
    outline: 'none',
    letterSpacing: '0.2em',
    boxSizing: 'border-box' as const,
  }

  const labelStyle = {
    fontFamily: 'Nunito Sans, sans-serif',
    fontSize: '10px',
    fontWeight: '400',
    color: '#C65427',
    letterSpacing: '0.3em',
    textTransform: 'uppercase' as const,
    marginBottom: '8px',
    display: 'block',
    textAlign: 'center' as const,
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center"
      style={{ backgroundColor: '#411F10' }}
    >
      {/* LOGO È */}
      <img
        src="/images/hero/E.png"
        alt="È"
        style={{
          height: '80px',
          objectFit: 'contain',
          marginBottom: '16px',
        }}
      />

      {/* ADMINISTRACIÓN */}
      <p style={{
        fontFamily: 'Nunito Sans, sans-serif',
        fontSize: '12px',
        fontWeight: '300',
        color: '#C65427',
        letterSpacing: '0.4em',
        textTransform: 'uppercase',
        marginBottom: '40px',
      }}>
        ADMINISTRACIÓN
      </p>

            {/* FORMULARIO */}
      <div style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '12px' }}>

        {/* USUARIO */}
        <div>
          <span style={labelStyle}>USUARIO</span>
          <input
            type="text"
            value={usuario}
            onChange={e => { setUsuario(e.target.value); setError(false) }}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            style={inputStyle}
            autoFocus
          />
        </div>

        {/* CONTRASEÑA */}
        <div>
          <span style={labelStyle}>CONTRASEÑA</span>
          <input
            type="password"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(false) }}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            style={inputStyle}
          />
        </div>

        {error && (
          <p style={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '10px',
            color: '#C65427',
            letterSpacing: '0.2em',
            textAlign: 'center',
          }}>
            USUARIO O CONTRASEÑA INCORRECTOS
          </p>
        )}

        {/* ACCEDER */}
        <button
          onClick={handleLogin}
          className="w-full hover:opacity-90 transition-opacity"
          style={{
            backgroundColor: '#C65427',
            color: '#FFFFFF',
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '13px',
            fontWeight: '600',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            padding: '14px',
            border: 'none',
            cursor: 'pointer',
            width: '100%',
            marginTop: '4px',
          }}
        >
          ACCEDER
        </button>

        {/* VOLVER */}
        <div className="flex justify-center mt-2">
          <Link
            to="/"
            style={{
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '11px',
              fontWeight: '300',
              color: 'rgba(217,217,217,0.4)',
              letterSpacing: '0.2em',
              textDecoration: 'none',
            }}
            className="hover:opacity-70 transition-opacity"
          >
            ← Volver a la web
          </Link>
        </div>
      </div>
    </div>
  )
}