import { useState } from 'react'
import { useLanguage } from '../../hooks/useLanguage'
import type { Language } from '../../context/LanguageContext'
import { menuData } from '../../data/menuData'
import type { MenuCategory, MenuItem } from '../../data/menuData'
import { useSupabaseMenu } from '../../hooks/useSupabaseMenu'
import type { CategoryWithItems } from '../../hooks/useSupabaseMenu'
import { useLocation, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

// Adapta CategoryWithItems de Supabase al formato que usa el componente
const adaptCategory = (cat: CategoryWithItems, lang: string) => ({
  id: cat.id,
  name_es: cat.name_es,
  name_ca: cat.name_ca ?? cat.name_es,
  name_en: cat.name_en ?? cat.name_es,
  name_fr: cat.name_fr ?? cat.name_es,
  showPriceColumns: cat.show_price_columns as 'both' | 'copa_only' | 'none',
  items: cat.items
  .filter(item => item.available)
  .map(item => ({
      id: item.id,
      name_es: item.name_es,
      name_ca: item.name_ca,
      name_en: item.name_en,
      name_fr: item.name_fr,
      year: item.year,
      subcategory: item[`subcategory_${lang}` as keyof typeof item] as string ?? item.subcategory,
vintage_cellar_do: item[`vintage_cellar_do_${lang}` as keyof typeof item] as string ?? item.vintage_cellar_do,
      description_es: item.description_es,
      description_ca: item.description_ca,
      description_en: item.description_en,
      description_fr: item.description_fr,
    price_copa: item.copa_available ? item.price_copa : null,        // ← si copa desactivada → null
    price_bottle: item.bottle_available ? item.price_bottle : null,  // ← si botella desactivada → null
    available: item.available&&
      (item.copa_available || item.bottle_available), // ← oculta si ambos desactivados
  }))
})

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
  setSearchOpen,
  placeholder, 
}: { 
  searchQuery: string
  setSearchQuery: (q: string) => void
  searchOpen: boolean
  setSearchOpen: (open: boolean) => void
  placeholder: string
}) {
  return (
    <div className="flex items-center justify-end" style={{ gap: '8px' }}>
      {searchOpen && (
        <input
          autoFocus
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder={placeholder} 
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
const [searchParams, setSearchParams] = useSearchParams()  // ← AÑADE
const [view, setView] = useState<View>((searchParams.get('view') as View) ?? 'index')  // ← CAMBIA
const [activeCategory, setActiveCategory] = useState<string>(searchParams.get('cat') ?? '')  // ← CAMBIA
const [priceFilter, setPriceFilter] = useState<PriceFilter>('all')
const [searchQuery, setSearchQuery] = useState<string>('')
const [searchOpen, setSearchOpen] = useState<boolean>(false)
const location = useLocation()
const { categories: dbCategories, loading, error } = useSupabaseMenu()
const { t } = useTranslation()

  // ← AQUÍ dentro del componente
  const adaptedCategories = dbCategories
    .filter((cat: CategoryWithItems) => cat.available)
    .map(cat => adaptCategory(cat, lang))

  useState(() => {
  const state = location.state as { openCategory?: string } | null
  if (state?.openCategory) {
    setActiveCategory(state.openCategory)
    setView('category')
  }
})

  const getCategoryName = (cat: MenuCategory) =>
    (cat[`name_${lang}` as keyof MenuCategory] as string) || cat.name_es

const getItemName = (item: MenuItem) => {
  return (item[`name_${lang}` as keyof MenuItem] as string) || item.name_es
}

const getItemDescription = (item: MenuItem) => {
  return (item[`description_${lang}` as keyof MenuItem] as string) || item.description_es || ''
}


  const activeData = adaptedCategories.find(c => c.id === activeCategory)
  const isVinosPorCopa = activeCategory === VINOS_POR_COPA_ID

const currentItems = isVinosPorCopa
  ? adaptedCategories.flatMap(cat => cat.items as MenuItem[]).filter((i: MenuItem) => i.price_copa !== null && i.available)
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

  const renderItem = (item: MenuItem, index: number, arr: MenuItem[]) => (
  <div
    key={item.id}
    style={{
      paddingTop: '23px',
      paddingBottom: '23px',
      borderBottom: index < arr.length - 1 ? '1px solid rgba(0,0,0,0.08)' : 'none',
    }}
  >
    <div className="flex items-start justify-between gap-4">
      <span style={{
        fontFamily: 'Nunito Sans, sans-serif',
        fontSize: '14px',
        fontWeight: '700',
        color: '#411F10',
        lineHeight: '120%',
        letterSpacing: '0.01em',
        flex: 1,
      }}>
        {getItemName(item)}
      </span>

      <div className="flex shrink-0">
        {showCopa && (priceFilter === 'all' || priceFilter === 'copa') && (
          <span style={{ width: '56px', textAlign: 'center', fontFamily: 'Nunito Sans, sans-serif', fontSize: '11px', fontWeight: '700', color: '#411F10', lineHeight: '120%', letterSpacing: '0.01em', display: 'block' }}>
            {item.price_copa !== null ? formatPrice(item.price_copa) : ''}
          </span>
        )}
        {showBottle && (priceFilter === 'all' || priceFilter === 'bottle') && (
          <span style={{ width: '56px',textAlign: 'center', fontFamily: 'Nunito Sans, sans-serif', fontSize: '11px', fontWeight: '700', color: '#411F10', lineHeight: '120%', letterSpacing: '0.01em', display: 'block' }}>
            {item.price_bottle !== null ? formatPrice(item.price_bottle) : ''}
          </span>
        )}
        {!showCopa && !showBottle && (
          <span style={{ textAlign: 'center', fontFamily: 'Nunito Sans, sans-serif', fontSize: '11px', fontWeight: '700', color: '#411F10', lineHeight: '120%', letterSpacing: '0.01em', display: 'block' }}>
            {item.price_copa !== null ? formatPrice(item.price_copa) : ''}
          </span>
        )}
      </div>
    </div>

    {item.year && (
      <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', fontWeight: '400', color: '#000000', lineHeight: '120%', letterSpacing: '0.01em', marginTop: '3px' }}>
        {item.year}
      </p>
    )}
    {item.vintage_cellar_do && (
      <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', fontWeight: '400', color: '#000000', lineHeight: '120%', letterSpacing: '0.01em', marginTop: '2px' }}>
        {item.vintage_cellar_do}
      </p>
    )}
    {getItemDescription(item) && (
      <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '11px', fontWeight: '400', fontStyle: 'italic', color: '#333333', lineHeight: '120%', letterSpacing: '0em', marginTop: '6px' }}>
        {getItemDescription(item)}
      </p>
    )}
  </div>
)
const sortByPrice = (items: MenuItem[]) => {
  return [...items].sort((a, b) => {
    const bottleA = Number(a.price_bottle ?? a.price_copa ?? 0)
    const bottleB = Number(b.price_bottle ?? b.price_copa ?? 0)

    return bottleA - bottleB
  })
}

const normalize = (str: string) =>
  str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

const searchItems = (items: MenuItem[]) => {
  if (!searchQuery.trim()) return items
  const q = normalize(searchQuery)
  return items.filter(item =>
    normalize(item.name_es).includes(q) ||
    normalize(item.vintage_cellar_do ?? '').includes(q) ||
    normalize(item.description_es ?? '').includes(q)
  )
}

 const handleCategoryClick = (id: string) => {
  setActiveCategory(id)
  setPriceFilter('all')
  setSearchQuery('')
  setSearchOpen(false)
  setView('category')
  setSearchParams({ view: 'category', cat: id })
}

const vinosPorCopaLabel = t('carta.vinos_por_copa')

// ===== ÍNDICE =====
if (view === 'index') {
    if (loading) return (

  <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAFAFA' }}>
      <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#9A8878', letterSpacing: '0.3em' }}>
        {t('carta.cargando')}
      </p>
    </div>
  )

    if (error) return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAFAFA' }}>
      <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#C65427', letterSpacing: '0.3em' }}>
        {t('carta.error')}
      </p>
    </div>
  )

  return(
    <div className="min-h-screen w-full flex flex-col" style={{ backgroundColor: '#FAFAFA' }}>
      <div
        className="w-full flex flex-col items-center flex-1"
        style={{ maxWidth: '480px', padding: '0 24px', margin: '0 auto' }}
      >
        {/* TÍTULO + LUPA */}
        {/* LUPA */}
<div className="w-full flex items-center justify-end" style={{ marginTop: '32px', marginBottom: '24px' }}>
  <SearchBar
    searchQuery={searchQuery}
    setSearchQuery={setSearchQuery}
    searchOpen={searchOpen}
    setSearchOpen={setSearchOpen}
    placeholder={t('carta.buscar_placeholder')}
  />
</div>

<div className="w-full flex flex-col items-center">
  {searchQuery ? (
    // Vista búsqueda global
    <div className="w-full">
      {adaptedCategories.map(cat => {
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
                   fontFamily: 'Nunito Sans, sans-serif',
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#411F10',
                    lineHeight: '120%',
                    letterSpacing: '0.01em',
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
                {item.year && (
  <p style={{
    fontFamily: 'Nunito Sans, sans-serif',
    fontSize: '12px',
    fontWeight: '400',
    color: '#000000',
    lineHeight: '120%',
    letterSpacing: '0.01em',
    marginTop: '3px',
  }}>
    {item.year}
  </p>
)}
{item.vintage_cellar_do && (
  <p style={{
    fontFamily: 'Nunito Sans, sans-serif',
    fontSize: '12px',
    fontWeight: '400',
    color: '#000000',
    lineHeight: '120%',
    letterSpacing: '0.01em',
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
      {adaptedCategories.map((cat) => (
        <div key={cat.id} className="w-full">
          <button
            onClick={() => handleCategoryClick(cat.id)}
            className="w-full text-center transition-opacity hover:opacity-60"
            style={{
             fontFamily: 'Nunito Sans, sans-serif',
             fontSize: '14px',
            fontWeight: '600',
            color: '#411F10',
            letterSpacing: '0.25em',
            lineHeight: '120%',
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
                fontSize: '14px',
                fontWeight: '600',
                color: '#411F10',
                letterSpacing: '0.25em',
                lineHeight: '120%',
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
          onClick={() => {
          setView('index')
          setActiveCategory('')
           setSearchParams({})
          }}
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
                {t('carta.per_copa')}
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
                {t('carta.per_botella')}
              </button>
            </div>
           ) : (
    <div style={{ height: '28px' }} />
          )}

  {/* LUPA — derecha, misma altura que la flecha */}
  <div style={{ justifySelf: 'end' }}>
    <SearchBar
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      searchOpen={searchOpen}
      setSearchOpen={setSearchOpen}
      placeholder={t('carta.buscar_placeholder')}
    />
  </div>
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

            {adaptedCategories
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
                            fontFamily: 'Nunito Sans, sans-serif',
                            fontSize: '14px',
                            fontWeight: '700',
                            color: '#411F10',
                            lineHeight: '120%',
                            letterSpacing: '0.01em',
                            flex: 1,
                          }}>
                            {getItemName(item)}
                          </span>
                          <span style={{
                            width: '56px',
                            textAlign: 'center',
                            fontFamily: 'Nunito Sans, sans-serif',
                            fontSize: '11px',
                            fontWeight: '700',
                            color: '#411F10',
                            lineHeight: '120%',
                            letterSpacing: '0.01em',
                            display: 'block',
                          }}>
                            {item.price_copa !== null ? formatPrice(item.price_copa) : ''}
                          </span>
                        </div>
                        {item.year && (
  <p style={{
    fontFamily: 'Nunito Sans, sans-serif',
    fontSize: '12px',
    fontWeight: '400',
    color: '#000000',
    lineHeight: '120%',
    letterSpacing: '0.01em',
    marginTop: '3px',
  }}>
    {item.year}
  </p>
)}
{item.vintage_cellar_do && (
  <p style={{
    fontFamily: 'Nunito Sans, sans-serif',
    fontSize: '12px',
    fontWeight: '400',
    color: '#000000',
    lineHeight: '120%',
    letterSpacing: '0.01em',
    marginTop: '2px',
  }}>
    {item.vintage_cellar_do}
  </p>
)}
                        {getItemDescription(item) && (
                          <p style={{
                            fontFamily: 'Nunito Sans, sans-serif',
                            fontSize: '11px',
                            fontWeight: '400',
                            fontStyle: 'italic',
                            color: '#333333',
                            lineHeight: '120%',
                            letterSpacing: '0em',
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
    
  <div className="flex flex-col">

    {/* Título — centrado */}
    <h2 style={{
      fontFamily: 'Nunito Sans, sans-serif',
      fontSize: '14px',
      fontWeight: '400',
      color: '#411F10',
    letterSpacing: '0.5em',
    textTransform: 'uppercase',
    textAlign: 'center',
    width: '100%',
    marginTop: '30px',
    marginBottom: '16px',
  }}>
    {currentTitle}
  </h2>

{/* Iconos — alineados a la derecha */}
{(showCopa || showBottle) && (
  <div className="flex items-start justify-between gap-4 mb-4">
    <div style={{ flex: 1 }} />
    <div className="flex shrink-0">
      {showCopa && (priceFilter === 'all' || priceFilter === 'copa') && (
        <div
          onClick={() => showBottle && setPriceFilter(priceFilter === 'copa' ? 'all' : 'copa')}
          style={{ width: '56px', display: 'flex', justifyContent: 'center', cursor: showBottle ? 'pointer' : 'default', opacity: priceFilter === 'copa' || !showBottle ? 1 : 0.4 }}
        >
          <img src="/images/hero/copa.png" alt="Copa" style={{ height: '28px', objectFit: 'contain' }} />
        </div>
      )}
      {showBottle && (priceFilter === 'all' || priceFilter === 'bottle') && (
        <div
          onClick={() => setPriceFilter(priceFilter === 'bottle' ? 'all' : 'bottle')}
          style={{ width: '56px', display: 'flex', justifyContent: 'center', cursor: 'pointer', opacity: priceFilter === 'bottle' ? 1 : 0.4 }}
        >
          <img src="/images/hero/botella.png" alt="Botella" style={{ height: '28px', objectFit: 'contain' }} />
        </div>
      )}
    </div>
  </div>
)}

            {/* Items */}
{(() => {
  const items = sortByPrice(searchItems(filteredItems(currentItems)))
  const subcats = [...new Set(items.map(i => i.subcategory).filter(Boolean))] as string[]

  if (subcats.length === 0) {
    return items.map((item, index, arr) => renderItem(item, index, arr))
  }

  return (
    <>
      {items.filter(i => !i.subcategory).map((item, index, arr) => renderItem(item, index, arr))}
      {subcats.map(sub => {
        const subItems = items.filter(i => i.subcategory === sub)
        return (
          <div key={sub}>
            <p style={{
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '11px',
              fontWeight: '600',
              color: '#C65427',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              marginTop: '24px',
              marginBottom: '8px',
              paddingBottom: '6px',
              borderBottom: '1px solid rgba(196,98,45,0.2)',
            }}>
              {sub}
            </p>
            {subItems.map((item, index, arr) => renderItem(item, index, arr))}
          </div>
        )
      })}
    </>
  )
})()}

          </div>
        )}
      </div>
    </div>
  )
}