import { useState } from 'react'
import { useLanguage } from '../../hooks/useLanguage'
import type { Language } from '../../context/LanguageContext'
import { menuData } from '../../data/menuData'
import type { MenuCategory, MenuItem } from '../../data/menuData'

type View = 'index' | 'category'
type PriceFilter = 'all' | 'copa' | 'bottle'

const formatPrice = (price: number) =>
  Number.isInteger(price)
    ? `${price} €`
    : `${price.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €`

const VINOS_POR_COPA_ID = 'vinos_por_copa'

function SearchBar({ 
  searchQuery, 
  setSearchQuery, 
  searchOpen, 
  setSearchOpen 
}: { 
  searchQuery: string
  setSearchQuery: (q: string) => void
  searchOpen: boolean
  setSearchOpen: (open: boolean) => void
}) {
  return (
    <div className="flex items-center justify-end" style={{ gap: '8px' }}>
      {searchOpen && (
        <input
          autoFocus
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Bodega, D.O., uva..."
          style={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '12px',
            fontWeight: '300',
            color: '#333333',
            letterSpacing: '0.05em',
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom: '1px solid rgba(0,0,0,0.2)',
            outline: 'none',
            width: '160px',
            paddingBottom: '2px',
          }}
        />
      )}
      {searchOpen && searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          style={{ color: '#9A8878', fontSize: '12px' }}
        >
          ✕
        </button>
      )}
      <button
        onClick={() => {
          setSearchOpen(!searchOpen)
          if (searchOpen) setSearchQuery('')
        }}
        aria-label="Buscar"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <img
          src="/images/hero/Lupa.png"
          alt="Buscar"
          style={{
            height: '16px',
            objectFit: 'contain',
            opacity: searchOpen ? 1 : 0.4,
            transition: 'opacity 0.2s',
          }}
        />
      </button>
    </div>
  )
}

export default function Menu() {
  const { language, changeLanguage } = useLanguage()
  const lang = language
  const [view, setView] = useState<View>('index')
  const [activeCategory, setActiveCategory] = useState<string>('')
  const [priceFilter, setPriceFilter] = useState<PriceFilter>('all')
  const [searchQuery, setSearchQuery] = useState<string>('') 
  const [searchOpen, setSearchOpen] = useState<boolean>(false)

  const getCategoryName = (cat: MenuCategory) =>
    (cat[`name_${lang}` as keyof MenuCategory] as string) || cat.name_es

  const getItemName = (item: MenuItem) => item.name_es
  const getItemDescription = (item: MenuItem) => item.description_es

  const activeData = menuData.categories.find(c => c.id === activeCategory)
  const isVinosPorCopa = activeCategory === VINOS_POR_COPA_ID

const currentItems = isVinosPorCopa
  ? menuData.categories.flatMap(cat => cat.items as MenuItem[]).filter((i: MenuItem) => i.price_copa !== null && i.available)
  : activeData?.items.filter((i: MenuItem) => i.available) ?? []

  const currentTitle = isVinosPorCopa
    ? lang === 'ca' ? 'VINS PER COPA'
      : lang === 'en' ? 'WINES BY THE GLASS'
      : lang === 'fr' ? 'VINS AU VERRE'
      : 'VINOS POR COPA'
    : activeData ? getCategoryName(activeData) : ''

  const priceColumns = isVinosPorCopa ? 'copa_only' : (activeData?.showPriceColumns ?? 'none')
  const showCopa = priceColumns === 'both' || priceColumns === 'copa_only'
  const showBottle = priceColumns === 'both'

  const filteredItems = (items: MenuItem[]) => {
    if (priceFilter === 'copa') return items.filter(i => i.price_copa !== null)
    if (priceFilter === 'bottle') return items.filter(i => i.price_bottle !== null)
    return items
  }

  const sortByPrice = (items: MenuItem[]) => {
  return [...items].sort((a, b) => {
    const priceA = a.price_copa ?? a.price_bottle ?? 0
    const priceB = b.price_copa ?? b.price_bottle ?? 0
    return priceA - priceB
  })
}

const searchItems = (items: MenuItem[]) => {  // ← AQUÍ
  if (!searchQuery.trim()) return items
  const q = searchQuery.toLowerCase()
  return items.filter(item =>
    item.name_es.toLowerCase().includes(q) ||
    item.vintage_cellar_do?.toLowerCase().includes(q) ||
    item.description_es?.toLowerCase().includes(q)
  )
}

  const handleCategoryClick = (id: string) => {
    setActiveCategory(id)
    setPriceFilter('all')
    setSearchQuery('') 
    setView('category')
  }

  const vinosPorCopaLabel = lang === 'ca' ? 'VINS PER COPA'
    : lang === 'en' ? 'WINES BY THE GLASS'
    : lang === 'fr' ? 'VINS AU VERRE'
    : 'VINOS POR COPA'

// ===== ÍNDICE =====
if (view === 'index') {
  return (
    <div className="min-h-screen w-full flex flex-col" style={{ backgroundColor: '#FAFAFA' }}>
      <div
        className="w-full flex flex-col items-center flex-1"
        style={{ maxWidth: '480px', padding: '0 24px', margin: '0 auto' }}
      >
        {/* TÍTULO + LUPA */}
        <div className="w-full flex items-center justify-between" style={{ marginTop: '32px', marginBottom: '24px' }}>
          <div style={{ width: '26px' }} />
          <p style={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '11px',
            fontWeight: '300',
            color: '#6A6A6A',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
          }}>
            CARTA
          </p>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchOpen={searchOpen}
            setSearchOpen={setSearchOpen}
          />
        </div>
<div className="w-full flex flex-col items-center">
  {searchQuery ? (
    // Vista búsqueda global
    <div className="w-full">
      {menuData.categories.map(cat => {
        const results = searchItems(cat.items.filter((i: MenuItem) => i.available))
        if (results.length === 0) return null
        return (
          <div key={cat.id} className="w-full mb-6">
            <p style={{
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '11px',
              fontWeight: '600',
              color: '#C65427',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              marginBottom: '8px',
              paddingBottom: '6px',
              borderBottom: '1px solid rgba(196,98,45,0.2)',
            }}>
              {getCategoryName(cat)}
            </p>
            {results.map(item => (
              <div key={item.id} style={{
                padding: '12px 0',
                borderBottom: '1px solid rgba(0,0,0,0.06)',
              }}>
                <div className="flex justify-between gap-4">
                  <span style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#1A1A1A',
                    flex: 1,
                  }}>
                    {getItemName(item)}
                  </span>
                  <span style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '13px',
                    color: '#1A1A1A',
                  }}>
                    {item.price_copa !== null ? formatPrice(item.price_copa) : ''}
                    {item.price_copa !== null && item.price_bottle !== null ? ' · ' : ''}
                    {item.price_bottle !== null ? formatPrice(item.price_bottle) : ''}
                  </span>
                </div>
                {item.vintage_cellar_do && (
                  <p style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '11px',
                    color: '#9A8878',
                    marginTop: '2px',
                  }}>
                    {item.vintage_cellar_do}
                  </p>
                )}
              </div>
            ))}
          </div>
        )
      })}
    </div>
  ) : (
    // Vista normal — lista categorías
    <>
      {menuData.categories.map((cat) => (
        <div key={cat.id} className="w-full">
          <button
            onClick={() => handleCategoryClick(cat.id)}
            className="w-full text-center transition-opacity hover:opacity-60"
            style={{
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '13px',
              fontWeight: '600',
              color: '#333333',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: 'clamp(14px, 3vw, 18px) 0',
              borderBottom: '1px dashed rgba(0,0,0,0.15)',
              width: '100%',
            }}
          >
            {getCategoryName(cat)}
          </button>

          {cat.id === 'espumosos' && (
            <button
              onClick={() => handleCategoryClick(VINOS_POR_COPA_ID)}
              className="w-full flex items-center justify-center gap-3 transition-opacity hover:opacity-60"
              style={{
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '13px',
                fontWeight: '600',
                color: '#333333',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                padding: 'clamp(14px, 3vw, 18px) 0',
                borderBottom: '1px dashed rgba(0,0,0,0.15)',
                width: '100%',
              }}
            >
              {vinosPorCopaLabel}
              <img
                src="/images/hero/copa.png"
                alt="Copa"
                style={{ height: '16px', objectFit: 'contain', opacity: 0.6 }}
              />
            </button>
          )}
        </div>
      ))}
    </>
  )}
</div>
             </div>
      </div>
    )
  }

  // ===== VISTA CATEGORÍA =====
  return (
    <div className="min-h-screen w-full flex flex-col" style={{ backgroundColor: '#FAFAFA' }}>
      <div
        className="w-full flex flex-col"
        style={{ maxWidth: '600px', padding: '0 24px', margin: '0 auto', width: '100%' }}
      >

        {/* FILA SUPERIOR */}
        <div
       className="grid mt-10 mb-8"
        style={{ gridTemplateColumns: '1fr auto 1fr', alignItems: 'center' }}
        >

          {/* VOLVER */}
          <button
            onClick={() => setView('index')}
            aria-label="Volver al índice"
            style={{ fontSize: '22px', color: '#6A6A6A', justifySelf: 'start'}}
          >
            ←
          </button>

          {/* FILTROS — solo si hay copa Y botella */}
          {!isVinosPorCopa && showCopa && showBottle ? (
            <div className="flex items-center" style={{ gap: '32px' }}>
              <button
                onClick={() => setPriceFilter(priceFilter === 'copa' ? 'all' : 'copa')}
                style={{
                  fontFamily: 'Nunito Sans, sans-serif',
                  fontSize: '11px',
                  fontWeight: priceFilter === 'copa' ? '600' : '300',
                  color: priceFilter === 'copa' ? '#411F10' : '#9A8878',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  textDecoration: priceFilter === 'copa' ? 'underline' : 'none',
                  textUnderlineOffset: '4px',
                  padding: '4px 8px',
                }}
              >
                PER COPA
              </button>
              <button
                onClick={() => setPriceFilter(priceFilter === 'bottle' ? 'all' : 'bottle')}
                style={{
                  fontFamily: 'Nunito Sans, sans-serif',
                  fontSize: '11px',
                  fontWeight: priceFilter === 'bottle' ? '600' : '300',
                  color: priceFilter === 'bottle' ? '#411F10' : '#9A8878',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  textDecoration: priceFilter === 'bottle' ? 'underline' : 'none',
                  textUnderlineOffset: '4px',
                  padding: '4px 8px',
                }}
              >
                PER BOTELLA
              </button>
            </div>
           ) : (
    <div style={{ height: '28px' }} />
          )}

  {/* DERECHA — vacío */}
  <div /> 
        </div>

        {/* ===== VINOS POR COPA — agrupado por categoría ===== */}
        {isVinosPorCopa ? (
          <div className="flex flex-col">
            <h2 className="text-center mb-8" style={{
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '14px',
              fontWeight: '400',
              color: '#411F10',
              letterSpacing: '0.5em',
              textTransform: 'uppercase',
              marginTop: '20px',
              marginBottom: '20px',
            }}>
              {vinosPorCopaLabel}
            </h2>

            {menuData.categories
              .filter(cat => cat.showPriceColumns === 'both' || cat.showPriceColumns === 'copa_only')
              .map(cat => {
                const itemsCopa = cat.items.filter(i => i.available && i.price_copa !== null)
                if (itemsCopa.length === 0) return null

                return (
                  <div key={cat.id} className="mb-10">

                    {/* Subtítulo categoría + icono */}
                    <div className="flex items-center justify-between mb-3"
                      style={{ borderBottom: '1px solid rgba(196,98,45,0.2)', 
                              paddingBottom: '10px',
                              marginTop: '40px',  // ← separación entre categorías
                             marginBottom: '8px',
                      }}
                    >
                      <p style={{
                        fontFamily: 'Nunito Sans, sans-serif',
                        fontSize: '15px',
                        fontWeight: '600',
                        color: '#C65427',
                        letterSpacing: '0.3em',
                        textTransform: 'uppercase',
                      }}>
                        {getCategoryName(cat)}
                      </p>
                      <div style={{ width: '56px', display: 'flex', justifyContent: 'center' }}>
                        <img src="/images/hero/copa.png" alt="Copa"
                          style={{ height: '22px', objectFit: 'contain', opacity: 0.5 }} />
                      </div>
                    </div>

                    {/* Items */}
                    {sortByPrice(searchItems(itemsCopa)).map((item, index) => (
                      <div
                        key={item.id}
                        style={{
                          paddingTop: '16px',
                          paddingBottom: '16px',
                          borderBottom: index < itemsCopa.length - 1
                            ? '1px solid rgba(0,0,0,0.06)'
                            : 'none',
                        }}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <span style={{
                            fontFamily: 'Playfair Display, serif',
                            fontSize: '15px',
                            fontWeight: '700',
                            color: '#1A1A1A',
                            lineHeight: '140%',
                            flex: 1,
                          }}>
                            {getItemName(item)}
                          </span>
                          <span style={{
                            width: '56px',
                            textAlign: 'center',
                            fontFamily: 'Playfair Display, serif',
                            fontSize: '14px',
                            color: '#1A1A1A',
                            flexShrink: 0,
                          }}>
                            {item.price_copa !== null ? formatPrice(item.price_copa) : ''}
                          </span>
                        </div>
                        {item.vintage_cellar_do && (
                          <p style={{
                            fontFamily: 'Playfair Display, serif',
                            fontSize: '12px',
                            color: '#9A8878',
                            marginTop: '3px',
                          }}>
                            {item.vintage_cellar_do}
                          </p>
                        )}
                        {getItemDescription(item) && (
                          <p style={{
                            fontFamily: 'Playfair Display, serif',
                            fontSize: '12px',
                            fontStyle: 'italic',
                            color: '#9A8878',
                            lineHeight: '160%',
                            marginTop: '6px',
                          }}>
                            {getItemDescription(item)}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )
              })}
          </div>

        ) : (
          // ===== VISTA CATEGORÍA NORMAL =====
          <div className="flex flex-col">

            {/* Título + iconos */}
            <div className="flex items-end justify-between"
            style={{ marginTop: '30px', marginBottom: '30px' }}
            >

                {/* Espacio izquierda */}
              <div style={{ width: '26px' }} />

              {/* Título centro */}
              <h2 style={{
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '14px',
                fontWeight: '400',
                color: '#411F10',
                letterSpacing: '0.5em',
                textTransform: 'uppercase',
                flex: 1,
                textAlign: 'center',
              }}>
                {currentTitle}
              </h2>

         {/* Iconos + lupa derecha */}
  <div className="flex items-center shrink-0" style={{ gap: '8px' }}>
    {showCopa && (priceFilter === 'all' || priceFilter === 'copa') && (
      <div
        onClick={() => showBottle && setPriceFilter(priceFilter === 'copa' ? 'all' : 'copa')}
        style={{
          width: '40px', display: 'flex', justifyContent: 'center',
          cursor: showBottle ? 'pointer' : 'default',
          opacity: priceFilter === 'copa' || !showBottle ? 1 : 0.4,
        }}
      >
        <img src="/images/hero/copa.png" alt="Copa"
          style={{ height: '24px', objectFit: 'contain' }} />
      </div>
    )}
    {showBottle && (priceFilter === 'all' || priceFilter === 'bottle') && (
      <div
        onClick={() => setPriceFilter(priceFilter === 'bottle' ? 'all' : 'bottle')}
        style={{
          width: '40px', display: 'flex', justifyContent: 'center',
          cursor: 'pointer',
          opacity: priceFilter === 'bottle' ? 1 : 0.4,
        }}
      >
        <img src="/images/hero/botella.png" alt="Botella"
          style={{ height: '24px', objectFit: 'contain' }} />
      </div>
    )}
    <SearchBar
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      searchOpen={searchOpen}
      setSearchOpen={setSearchOpen}
    />
  </div>
</div>

            {/* Items */}
            {sortByPrice(searchItems(filteredItems(currentItems))).map((item, index, arr) => (
              <div
                key={item.id}
                style={{
                  paddingTop: '23px',
                  paddingBottom: '23px',
                  borderBottom: index < arr.length - 1
                    ? '1px solid rgba(0,0,0,0.08)'
                    : 'none',
                }}
              >


                <div className="flex items-start justify-between gap-4">
                  <span style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '15px',
                    fontWeight: '700',
                    color: '#1A1A1A',
                    lineHeight: '140%',
                    flex: 1,
                  }}>
                    {getItemName(item)}
                  </span>

                  <div className="flex shrink-0">
                    {/* Copa */}
                    {showCopa && (priceFilter === 'all' || priceFilter === 'copa') && (
                      <span style={{
                        width: '56px', textAlign: 'center',
                        fontFamily: 'Playfair Display, serif',
                        fontSize: '14px', color: '#1A1A1A', display: 'block',
                      }}>
                        {item.price_copa !== null ? formatPrice(item.price_copa) : ''}
                      </span>
                    )}
                    {/* Botella */}
                    {showBottle && (priceFilter === 'all' || priceFilter === 'bottle') && (
                      <span style={{
                        width: '56px', textAlign: 'center',
                        fontFamily: 'Playfair Display, serif',
                        fontSize: '14px', color: '#1A1A1A', display: 'block',
                      }}>
                        {item.price_bottle !== null ? formatPrice(item.price_bottle) : ''}
                      </span>
                    )}
                    {/* Precio único */}
                    {!showCopa && !showBottle && (
                      <span style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: '14px', color: '#1A1A1A',
                      }}>
                        {item.price_copa !== null ? formatPrice(item.price_copa) : ''}
                      </span>
                    )}
                  </div>
                </div>

                {item.vintage_cellar_do && (
                  <p style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '12px', color: '#9A8878',
                    marginTop: '3px', lineHeight: '150%',
                  }}>
                    {item.vintage_cellar_do}
                  </p>
                )}

                {getItemDescription(item) && (
                  <p style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '12px', fontStyle: 'italic',
                    color: '#9A8878', lineHeight: '160%', marginTop: '8px',
                  }}>
                    {getItemDescription(item)}
                  </p>
                )}
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  )
}