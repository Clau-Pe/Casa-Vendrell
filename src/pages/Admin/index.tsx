import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { menuData } from '../../data/menuData'
import type { MenuItem, MenuCategory } from '../../data/menuData'

type Tab = 'productos' | 'añadir' | 'traducciones'

export default function AdminIndex() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('productos')
  const [adminNombre, setAdminNombre] = useState('')
  const [filterCategory, setFilterCategory] = useState('todas')

useEffect(() => {
  let cancelled = false

  async function checkAuth() {
    const auth = localStorage.getItem('admin_auth')
    if (!auth) {
      navigate('/admin/login')
      return
    }
    const nombre = localStorage.getItem('admin_nombre') ?? ''
    if (!cancelled) setAdminNombre(nombre)
  }

  checkAuth()

  return () => {
    cancelled = true
  }
}, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('admin_auth')
    localStorage.removeItem('admin_nombre')
    navigate('/admin/login')
  }

  const allItems = menuData.categories.flatMap(cat =>
    cat.items.map(item => ({ ...item, categoryName: cat.name_es, categoryId: cat.id }))
  )

  const filteredItems = filterCategory === 'todas'
    ? allItems
    : allItems.filter(i => i.categoryId === filterCategory)

  const formatPrice = (price: number | null) =>
    price !== null ? `${price.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €` : '—'

  const headerStyle = {
    backgroundColor: '#411F10',
    padding: '16px 32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }

  const tabStyle = (active: boolean) => ({
    fontFamily: 'Nunito Sans, sans-serif',
    fontSize: '12px',
    fontWeight: '400',
    color: active ? '#C65427' : '#9A8878',
    letterSpacing: '0.2em',
    textTransform: 'uppercase' as const,
    paddingBottom: '8px',
    borderBottom: active ? '2px solid #C65427' : '2px solid transparent',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
  })

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAFA' }}>

      {/* HEADER */}
      <div style={headerStyle}>
        <div>
          <p style={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '11px',
            fontWeight: '600',
            color: '#C65427',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}>
            PANEL DE ADMINISTRACIÓN
          </p>
          <p style={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '11px',
            fontWeight: '300',
            color: 'rgba(217,217,217,0.6)',
            letterSpacing: '0.15em',
            marginTop: '2px',
          }}>
            CASA VÈNDRELL — {adminNombre}
          </p>
        </div>
        <div className="flex items-center gap-6">
          <Link
            to="/"
            style={{
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '11px',
              color: 'rgba(217,217,217,0.5)',
              letterSpacing: '0.15em',
              textDecoration: 'none',
            }}
            className="hover:opacity-70 transition-opacity"
          >
            ← Web
          </Link>
          <button
            onClick={handleLogout}
            style={{
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '11px',
              color: 'rgba(217,217,217,0.5)',
              letterSpacing: '0.15em',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
            className="hover:opacity-70 transition-opacity"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* CONTENIDO */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px' }}>

        {/* TABS */}
        <div className="flex items-center gap-8 mb-8"
          style={{ borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '0' }}
        >
          <button style={tabStyle(tab === 'productos')} onClick={() => setTab('productos')}>
            PRODUCTOS
          </button>
          <button style={tabStyle(tab === 'añadir')} onClick={() => setTab('añadir')}>
            + AÑADIR
          </button>
          <button style={tabStyle(tab === 'traducciones')} onClick={() => setTab('traducciones')}>
            TRADUCCIONES
          </button>
        </div>

        {/* ===== TAB PRODUCTOS ===== */}
        {tab === 'productos' && (
          <div>
            {/* Filtro categoría */}
            <select
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 16px',
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '13px',
                color: '#333333',
                border: '1px solid #D9D9D9',
                backgroundColor: '#FFFFFF',
                marginBottom: '24px',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="todas">Todas las secciones</option>
              {menuData.categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name_es}</option>
              ))}
            </select>

            {/* Lista productos */}
            <div className="flex flex-col" style={{ gap: '2px' }}>
              {filteredItems.map(item => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                  style={{
                    padding: '14px 16px',
                    backgroundColor: '#FFFFFF',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                  }}
                >
                  {/* Toggle */}
                  <div
                    onClick={() => console.log('toggle', item.id)}
                    style={{
                      width: '40px',
                      height: '22px',
                      borderRadius: '11px',
                      backgroundColor: item.available ? '#C65427' : '#D9D9D9',
                      position: 'relative',
                      cursor: 'pointer',
                      flexShrink: 0,
                      transition: 'background-color 0.2s',
                    }}
                  >
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: '#FFFFFF',
                      position: 'absolute',
                      top: '2px',
                      left: item.available ? '20px' : '2px',
                      transition: 'left 0.2s',
                    }} />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col flex-1 mx-4">
                    <span style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: item.available ? '#1A1A1A' : '#9A8878',
                    }}>
                      {item.name_es}
                    </span>
                    <span style={{
                      fontFamily: 'Nunito Sans, sans-serif',
                      fontSize: '11px',
                      color: '#9A8878',
                      marginTop: '2px',
                    }}>
                      {item.categoryName}
                      {item.vintage_cellar_do ? ` · ${item.vintage_cellar_do}` : ''}
                    </span>
                  </div>

                  {/* Precio */}
                  <span style={{
                    fontFamily: 'Nunito Sans, sans-serif',
                    fontSize: '13px',
                    color: '#C65427',
                    marginRight: '16px',
                    flexShrink: 0,
                  }}>
                    {item.price_copa && item.price_bottle
                      ? `${formatPrice(item.price_copa)} / ${formatPrice(item.price_bottle)}`
                      : item.price_copa
                        ? formatPrice(item.price_copa)
                        : formatPrice(item.price_bottle)
                    }
                  </span>

                  {/* Botón editar */}
                  <button
                    onClick={() => console.log('editar', item.id)}
                    style={{
                      fontFamily: 'Nunito Sans, sans-serif',
                      fontSize: '11px',
                      fontWeight: '600',
                      color: '#6A6A6A',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      padding: '6px 12px',
                      border: '1px solid #D9D9D9',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      flexShrink: 0,
                    }}
                    className="hover:border-[#C65427] hover:text-[#C65427] transition-colors"
                  >
                    EDITAR
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== TAB AÑADIR ===== */}
        {tab === 'añadir' && (
          <AddProductForm categories={menuData.categories} />
        )}

        {/* ===== TAB TRADUCCIONES ===== */}
        {tab === 'traducciones' && (
          <div className="flex flex-col items-center justify-center py-20">
            <p style={{
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '13px',
              color: '#9A8878',
              letterSpacing: '0.2em',
              textAlign: 'center',
            }}>
              Las traducciones automáticas estarán disponibles<br />
              cuando el backend esté conectado.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// ===== FORMULARIO AÑADIR PRODUCTO =====
function AddProductForm({ categories }: { categories: MenuCategory[] }) {
  const [form, setForm] = useState({
    category: categories[0]?.id ?? '',
    name_es: '',
    vintage_cellar_do: '',
    description_es: '',
    price_copa: '',
    price_bottle: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    fontFamily: 'Nunito Sans, sans-serif',
    fontSize: '13px',
    color: '#333333',
    border: '1px solid #D9D9D9',
    backgroundColor: '#FFFFFF',
    outline: 'none',
    boxSizing: 'border-box' as const,
  }

  const labelStyle = {
    fontFamily: 'Nunito Sans, sans-serif',
    fontSize: '10px',
    fontWeight: '600',
    color: '#9A8878',
    letterSpacing: '0.25em',
    textTransform: 'uppercase' as const,
    display: 'block',
    marginBottom: '6px',
  }

  const handleSubmit = async () => {
    if (!form.name_es || !form.category) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
    setForm({
      category: categories[0]?.id ?? '',
      name_es: '',
      vintage_cellar_do: '',
      description_es: '',
      price_copa: '',
      price_bottle: '',
    })
  }

  return (
    <div>
      <p style={{
        fontFamily: 'Nunito Sans, sans-serif',
        fontSize: '12px',
        color: '#9A8878',
        letterSpacing: '0.1em',
        marginBottom: '24px',
      }}>
        Introduce los datos en castellano. Las traducciones a CA · EN · FR se generarán automáticamente con IA.
      </p>

      <div className="flex flex-col" style={{ gap: '20px' }}>

        {/* SECCIÓN */}
        <div>
          <span style={labelStyle}>Sección</span>
          <select
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
            style={inputStyle}
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name_es}</option>
            ))}
          </select>
        </div>

        {/* NOMBRE */}
        <div>
          <span style={labelStyle}>Nombre (castellano)</span>
          <input
            type="text"
            value={form.name_es}
            onChange={e => setForm({ ...form, name_es: e.target.value })}
            placeholder="Ej: El Veïnat"
            style={inputStyle}
          />
        </div>

        {/* ANYADA · CELLER · DO */}
        <div>
          <span style={labelStyle}>Añada · Bodega · D.O.</span>
          <input
            type="text"
            value={form.vintage_cellar_do}
            onChange={e => setForm({ ...form, vintage_cellar_do: e.target.value })}
            placeholder="Ej: 2023 · Viñedos Singulares · Montsant"
            style={inputStyle}
          />
        </div>

        {/* DESCRIPCIÓN */}
        <div>
          <span style={labelStyle}>Descripción (castellano)</span>
          <textarea
            value={form.description_es}
            onChange={e => setForm({ ...form, description_es: e.target.value })}
            placeholder="Describe el producto..."
            rows={4}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>

        {/* PRECIOS */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span style={labelStyle}>Precio Copa (€)</span>
            <input
              type="number"
              value={form.price_copa}
              onChange={e => setForm({ ...form, price_copa: e.target.value })}
              placeholder="Ej: 5.50"
              step="0.10"
              min="0"
              style={inputStyle}
            />
          </div>
          <div>
            <span style={labelStyle}>Precio Botella (€)</span>
            <input
              type="number"
              value={form.price_bottle}
              onChange={e => setForm({ ...form, price_bottle: e.target.value })}
              placeholder="Ej: 24.00"
              step="0.10"
              min="0"
              style={inputStyle}
            />
          </div>
        </div>

        {/* BOTÓN */}
        <button
          onClick={handleSubmit}
          disabled={loading || !form.name_es}
          className="w-full hover:opacity-90 transition-opacity"
          style={{
            backgroundColor: loading ? '#9A8878' : '#C65427',
            color: '#FFFFFF',
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '13px',
            fontWeight: '600',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            padding: '16px',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: '8px',
          }}
        >
          {loading ? 'TRADUCIENDO CON IA...' : 'AÑADIR Y TRADUCIR'}
        </button>

        {success && (
          <p style={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '12px',
            color: '#C65427',
            letterSpacing: '0.2em',
            textAlign: 'center',
          }}>
            ✓ PRODUCTO AÑADIDO CORRECTAMENTE
          </p>
        )}
      </div>
    </div>
  )
}