import { useState } from 'react'
import { useLanguage } from '../../hooks/useLanguage'
import type { Language } from '../../context/LanguageContext'
import { menuData } from '../../data/menuData'
import type { MenuCategory, MenuItem } from '../../data/menuData'

type View = 'index' | 'category'
type PriceFilter = 'all' | 'copa' | 'bottle'

const COLORS = {
  bg: '#3D1A0A',
  accent: '#C4622D',
  textPrimary: '#F5ECD7',
  textSecondary: '#C8B89A',
  divider: 'rgba(196,98,45,0.25)',
}

const formatPrice = (price: number) =>
  price.toLocaleString('es-ES', { minimumFractionDigits: 2 }) + ' €'

export default function Menu() {
  const { language, changeLanguage } = useLanguage()
  const lang = language
  const [view, setView] = useState<View>('index')
  const [activeCategory, setActiveCategory] = useState<string>('')
  const [priceFilter, setPriceFilter] = useState<PriceFilter>('all')

  const getCategoryName = (cat: MenuCategory) => {
    return (cat[`name_${lang}` as keyof MenuCategory] as string) || cat.name_es
  }

  const getItemName = (item: MenuItem) => item.name_es

  const getItemDescription = (item: MenuItem) => item.description_es

  const activeData = menuData.categories.find(c => c.id === activeCategory)

  const filteredItems = (items: MenuItem[]) => {
    if (priceFilter === 'copa') return items.filter(i => i.price_copa !== null)
    if (priceFilter === 'bottle') return items.filter(i => i.price_bottle !== null)
    return items
  }

  const handleCategoryClick = (id: string) => {
    setActiveCategory(id)
    setView('category')
  }

if (view === 'index') {
  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ backgroundColor: '#FAFAFA' }}
    >
      <div
        className="w-full flex flex-col items-center flex-1"
        style={{ maxWidth: '480px', padding: '0 24px', margin: '0 auto' }}
      >

        {/* TÍTULO CARTA */}
        <p style={{
          fontFamily: 'Nunito Sans, sans-serif',
          fontSize: '11px',
          fontWeight: '300',
          color: '#6A6A6A',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          marginTop: '32px',
          marginBottom: '20px',
        }}>
          CARTA
        </p>



        {/* SELECTOR IDIOMA — solo móvil */}
        <div className="flex md:hidden items-center gap-6 mb-8">
          {(['ca', 'es', 'en', 'fr'] as Language[]).map(l => (
            <button
              key={l}
              onClick={() => changeLanguage(l)}
              aria-label={`Cambiar idioma a ${l}`}
              style={{
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '12px',
                fontWeight: lang === l ? '600' : '300',
                color: lang === l ? '#C65427' : '#6A6A6A',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        {/* LISTA CATEGORÍAS */}
        <div className="w-full flex flex-col items-center">
          {menuData.categories.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="w-full text-center transition-opacity hover:opacity-60"
              aria-label={`Ver categoría ${getCategoryName(cat)}`}
              style={{
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '13px',
                fontWeight: '600',
                color: '#333333',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                padding: 'clamp(14px, 3vw, 18px) 0',
                borderBottom: i < menuData.categories.length - 1
                  ? '1px dashed rgba(0,0,0,0.15)'
                  : 'none',
              }}
            >
              {getCategoryName(cat)}
            </button>
          ))}
        </div>

         {/* FILTROS AL PIE */}
        <div
          className="w-full flex items-center justify-center gap-8 mb-8"
          style={{ marginTop: '40px', marginBottom: '48px', gap: '12px' }}
        >
          <button
            onClick={() => setPriceFilter(priceFilter === 'copa' ? 'all' : 'copa')}
            className="flex items-center gap-3 transition-opacity hover:opacity-60"
            style={{
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '13px',
              fontWeight: priceFilter === 'copa' ? '600' : '300',
              color: priceFilter === 'copa' ? '#C65427' : '#6A6A6A',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '10px 0',
              borderBottom: '1px dashed rgba(0,0,0,0.15)',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <img
              src="/images/hero/copa.png"
              alt="Copa"
              style={{
                height: '18px',
                objectFit: 'contain',
                opacity: priceFilter === 'copa' ? 1 : 0.4,
              }}
            />
            SOLO COPAS
          </button>

          <button
            onClick={() => setPriceFilter(priceFilter === 'bottle' ? 'all' : 'bottle')}
            className="flex items-center gap-3 transition-opacity hover:opacity-60"
            style={{
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '13px',
              fontWeight: priceFilter === 'bottle' ? '600' : '300',
              color: priceFilter === 'bottle' ? '#C65427' : '#6A6A6A',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '10px 0',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <img
              src="/images/hero/botella.png"
              alt="Botella"
              style={{
                height: '18px',
                objectFit: 'contain',
                opacity: priceFilter === 'bottle' ? 1 : 0.4,
              }}
            />
            SOLO BOTELLAS
          </button>
        </div>

      </div>
      
    </div>
  )
}

// ===== VISTA CATEGORÍA =====
return (
  <div
    className="min-h-screen w-full flex flex-col"
    style={{ backgroundColor: '#FAFAFA' }}
  >
    <div
      className="w-full flex flex-col"
      style={{ maxWidth: '600px', padding: '0 24px', margin: '0 auto', width: '100%' }}
    >

      {/* Back + idioma móvil */}
      <div className="flex items-center justify-between mt-8 mb-6">
        <button
          onClick={() => setView('index')}
          className="hover:opacity-70 transition-opacity"
          aria-label="Volver al índice"
          style={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '12px',
            fontWeight: '300',
            color: '#6A6A6A',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          ←
        </button>
        <div className="flex md:hidden items-center gap-4">
          {(['ca', 'es', 'en', 'fr'] as Language[]).map(l => (
            <button
              key={l}
              onClick={() => changeLanguage(l)}
              style={{
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '12px',
                fontWeight: lang === l ? '600' : '300',
                color: lang === l ? '#C65427' : '#6A6A6A',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Título categoría + iconos en la misma fila */}
      <div className="flex items-end justify-between mb-6">
        <h2
          style={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '14px',
            fontWeight: '400',
            color: '#411F10',
            letterSpacing: '0.5em',
            textTransform: 'uppercase',
            flex: 1,
            textAlign: 'center',
          }}
        >
          {activeData ? getCategoryName(activeData) : ''}
        </h2>

        {/* Iconos copa/botella */}
        <div className="flex shrink-0" style={{ gap: '0' }}>
          {(priceFilter === 'all' || priceFilter === 'copa') && (
              <div
      onClick={() => setPriceFilter(priceFilter === 'copa' ? 'all' : 'copa')}
      style={{
        width: '56px',
        display: 'flex',
        justifyContent: 'center',
        cursor: 'pointer',
        opacity: priceFilter === 'copa' ? 1 : 0.5,
        transition: 'opacity 0.2s',
      }}
    >
      <img
        src="/images/hero/copa.png"
        alt="Filtrar por copa"
        style={{ height: '28px', objectFit: 'contain' }}
      />
    </div>
  )}
          {(priceFilter === 'all' || priceFilter === 'bottle') && (
             <div
      onClick={() => setPriceFilter(priceFilter === 'bottle' ? 'all' : 'bottle')}
      style={{
        width: '56px',
        display: 'flex',
        justifyContent: 'center',
        cursor: 'pointer',
        opacity: priceFilter === 'bottle' ? 1 : 0.5,
        transition: 'opacity 0.2s',
      }}
    >
      <img
        src="/images/hero/botella.png"
        alt="Filtrar por botella"
        style={{ height: '28px', objectFit: 'contain' }}
      />
    </div>
  )}
        </div>
      </div>

      {/* Items */}
      <div className="flex flex-col">
        {activeData && filteredItems(activeData.items.filter(i => i.available)).map((item, index, arr) => (
          <div
            key={item.id}
            style={{
              paddingTop: '20px',
              paddingBottom: '20px',
              borderBottom: index < arr.length - 1
                ? '1px solid rgba(0,0,0,0.08)'
                : 'none',
            }}
          >
            {/* Nombre + precios */}
            <div className="flex items-start justify-between gap-4">
              <span
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '15px',
                  fontWeight: '700',
                  color: '#1A1A1A',
                  lineHeight: '140%',
                  flex: 1,
                }}
              >
                {getItemName(item)}
              </span>

              {/* Precios — mismo ancho que iconos */}
              <div className="flex shrink-0" style={{ gap: '0' }}>
                {(priceFilter === 'all' || priceFilter === 'copa') && (
                  <span style={{
                    width: '56px',
                    textAlign: 'center',
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '14px',
                    color: '#1A1A1A',
                    display: 'block',
                  }}>
                    {item.price_copa !== null
                      ? Number.isInteger(item.price_copa)
                        ? `${item.price_copa} €`
                        : `${item.price_copa.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €`
                      : ''}
                  </span>
                )}
                {(priceFilter === 'all' || priceFilter === 'bottle') && (
                  <span style={{
                    width: '56px',
                    textAlign: 'center',
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '14px',
                    color: '#1A1A1A',
                    display: 'block',
                  }}>
                    {item.price_bottle !== null
                      ? Number.isInteger(item.price_bottle)
                        ? `${item.price_bottle} €`
                        : `${item.price_bottle.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €`
                      : ''}
                  </span>
                )}
              </div>
            </div>

            {/* Año · Bodega · DO */}
            {item.vintage_cellar_do && (
              <p style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '12px',
                fontWeight: '400',
                color: '#9A8878',
                marginTop: '3px',
                lineHeight: '150%',
              }}>
                {item.vintage_cellar_do}
              </p>
            )}

            {/* Descripción */}
            {getItemDescription(item) && (
              <p style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '12px',
                fontWeight: '400',
                fontStyle: 'italic',
                color: '#9A8878',
                lineHeight: '160%',
                marginTop: '8px',
              }}>
                {getItemDescription(item)}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
)
}