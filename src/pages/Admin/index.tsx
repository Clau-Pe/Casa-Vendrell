import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSupabaseMenu } from '../../hooks/useSupabaseMenu'
import { useSupabaseAdmin } from '../../hooks/useSupabaseAdmin'
import type { CategoryWithItems } from '../../hooks/useSupabaseMenu'
import type { MenuItemDB } from '../../lib/supabase'
import { supabase } from '../../lib/supabase'
import { translateProduct } from '../../utils/translate'
import { translateText } from '../../utils/translate'


type Tab = 'productos' | 'añadir' | 'categorias' | 'traducciones'| 'perfil'

export default function AdminIndex() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('productos')
  const [adminNombre, setAdminNombre] = useState('')
  const [filterCategory, setFilterCategory] = useState('todas')
  const [editingItem, setEditingItem] = useState<MenuItemDB | null>(null)
  const [searchAdmin, setSearchAdmin] = useState('')
  const { categories, loading, refetch } = useSupabaseMenu()
  const { toggleItem, addItem, updateItem, deleteItem, logActivity, saving, addCategory } = useSupabaseAdmin()
  const [editingCategory, setEditingCategory] = useState<CategoryWithItems | null>(null)
  

  useEffect(() => {
    let cancelled = false
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser()
    if (!user) { navigate('/admin/login'); return }
    const nombre = user.email?.split('@')[0] ?? 'Admin'
    if (!cancelled) setAdminNombre(nombre)
    }
    checkAuth()
    return () => { cancelled = true }
  }, [navigate])

  const handleLogout = async () => {
  await supabase.auth.signOut()
  localStorage.removeItem('admin_auth')
  localStorage.removeItem('admin_nombre')
  navigate('/admin/login')
}

  const allItems = categories.flatMap(cat =>
    cat.items.map(item => ({ ...item, categoryName: cat.name_es, categoryId: cat.id }))
  )

const filteredItems = categories
  .flatMap(cat => cat.items.map(item => ({ ...item, categoryName: cat.name_es, categoryId: cat.id })))
  .filter(item => {
    const normalize = (str: string) =>
  str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    const matchCategory = filterCategory === 'todas' || item.category_id === filterCategory
    const matchSearch = !searchAdmin || 
     normalize(item.name_es).includes(normalize(searchAdmin)) ||
  normalize(item.vintage_cellar_do ?? '').includes(normalize(searchAdmin)) ||
  normalize(item.description_es ?? '').includes(normalize(searchAdmin))
    return matchCategory && matchSearch
  })

  const handleToggle = async (id: number, currentAvailable: boolean) => {
    try {
      await toggleItem(id, !currentAvailable)
      await logActivity(adminNombre, 'TOGGLE', 'menu_item', id, { available: !currentAvailable })
      refetch()
    } catch (err) {
      console.error(err)
    }
  }

  const formatPrice = (price: number | null) =>
    price !== null ? `${Number(price).toLocaleString('es-ES', { minimumFractionDigits: 2 })} €` : '—'

const tabStyle = (active: boolean) => ({
  fontFamily: 'Nunito Sans, sans-serif',
  fontSize: '12px',
  fontWeight: '400' as const,
  color: active ? '#C65427' : '#333333',
  letterSpacing: '0.2em',
  textTransform: 'uppercase' as const,
  paddingBottom: '8px',
  borderBottom: active ? '2px solid #C65427' : '2px solid transparent',
  borderTop: 'none',
  borderLeft: 'none',
  borderRight: 'none',
  cursor: 'pointer' as const,
  background: 'none',
})

  const handleToggleCopa = async (id: number, current: boolean) => {
  try {
    await updateItem(id, { copa_available: !current })
    await logActivity(adminNombre, 'TOGGLE_COPA', 'menu_item', id, { copa_available: !current })
    refetch()
  } catch (err) {
    console.error(err)
  }
}

const handleToggleCategory = async (id: string, current: boolean) => {
  try {
    await supabase
      .from('categories')
      .update({ available: !current })
      .eq('id', id)
    await logActivity(adminNombre, 'TOGGLE_CATEGORY', 'category', undefined, { id, available: !current })
    refetch()
  } catch (err) {
    console.error(err)
  }
}

const handleToggleBottle = async (id: number, current: boolean) => {
  try {
    await updateItem(id, { bottle_available: !current })
    await logActivity(adminNombre, 'TOGGLE_BOTTLE', 'menu_item', id, { bottle_available: !current })
    refetch()
  } catch (err) {
    console.error(err)
  }
}

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAFA' }}>

      {/* HEADER */}
  <div style={{ 
  backgroundColor: '#411F10', 
  padding: '12px 16px', 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '8px',
    }}>
          <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '11px', fontWeight: '600', color: '#C65427', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            PANEL DE ADMINISTRACIÓN
          </p>
          <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '11px', fontWeight: '300', color: 'rgba(217,217,217,0.6)', letterSpacing: '0.15em', marginTop: '2px' }}>
            CASA VENDRELL — {adminNombre}
          </p>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/" style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '11px', color: '#411F10', letterSpacing: '0.15em', textDecoration: 'none' }} className="hover:opacity-70 transition-opacity">
            ← Web
          </Link>
          <button onClick={handleLogout} style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '11px', color: '#411F10', letterSpacing: '0.15em', background: 'none', border: 'none', cursor: 'pointer' }} className="hover:opacity-70 transition-opacity">
            Cerrar sesión
          </button>
        </div>
    

    {/* CONTENIDO */}
<div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px 16px' }}>

  {/* TABS — scroll horizontal en móvil */}
  <div 
    className="flex items-center gap-6 mb-8"
    style={{ 
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      overflowX: 'auto',
      WebkitOverflowScrolling: 'touch',
      paddingBottom: '0',
    }}
  >
    <button style={tabStyle(tab === 'productos')} onClick={() => setTab('productos')}>PRODUCTOS</button>
    <button style={tabStyle(tab === 'añadir')} onClick={() => setTab('añadir')}>+ AÑADIR</button>
    <button style={tabStyle(tab === 'categorias')} onClick={() => setTab('categorias')}>+ SECCIÓN</button>
    <button style={tabStyle(tab === 'traducciones')} onClick={() => setTab('traducciones')}>TRADUCCIONES</button>
    <button style={tabStyle(tab === 'perfil')} onClick={() => setTab('perfil')}>
    PERFIL
    </button>
  </div>

        {/* ===== TAB PRODUCTOS ===== */}
        {tab === 'productos' && (
          <div>
            {loading ? (
              <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#9A8878', letterSpacing: '0.3em', textAlign: 'center', padding: '40px 0' }}>
                CARGANDO...
              </p>
            ) : (
              <>
              {/* BUSCADOR */}
<div
  className="flex items-center"
  style={{
    border: '1px solid #D9D9D9',
    backgroundColor: '#FFFFFF',
    padding: '10px 14px',
    marginBottom: '12px',
    gap: '8px',
  }}
>
  <img
    src="/images/hero/Lupa.png"
    alt="Buscar"
    style={{ height: '14px', opacity: 0.4 }}
  />
  <input
    type="text"
    value={searchAdmin}
    onChange={e => setSearchAdmin(e.target.value)}
    placeholder="Buscar producto..."
    style={{
      flex: 1,
      fontFamily: 'Nunito Sans, sans-serif',
      fontSize: '13px',
      color: '#333333',
      border: 'none',
      outline: 'none',
      backgroundColor: 'transparent',
    }}
  />
  {searchAdmin && (
    <button
      onClick={() => setSearchAdmin('')}
      style={{ color: '#9A8878', fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer' }}
    >
      ✕
    </button>
  )}
</div>


                {/* Filtro */}
                <select
                  value={filterCategory}
                  onChange={e => setFilterCategory(e.target.value)}
                  style={{ width: '100%', padding: '10px 16px', fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px', color: '#333333', border: '1px solid #D9D9D9', backgroundColor: '#FFFFFF', marginBottom: '24px', outline: 'none', cursor: 'pointer' }}
                >
                  <option value="todas">Todas las secciones</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name_es}</option>
                  ))}
                </select>

                {/* Lista */}
                <div className="flex flex-col" style={{ gap: '2px' }}>
                  {filteredItems.map(item => (
                    <div
  key={item.id}
  className="flex items-center justify-between"
  style={{ 
    padding: '12px 12px', 
    backgroundColor: '#FFFFFF', 
    borderBottom: '1px solid rgba(0,0,0,0.06)',
    gap: '8px',
  }}
>
                    {/* Toggles según tipo de venta */}
<div className="flex flex-col gap-1">
  {item.price_copa !== null && item.price_bottle !== null ? (
    // Tiene copa Y botella — 2 toggles
    <>
      <div className="flex items-center gap-2">
        <div
          onClick={() => handleToggleCopa(item.id, item.copa_available)}
          style={{
            width: '32px', height: '18px', borderRadius: '9px',
            backgroundColor: item.copa_available ? '#C65427' : '#D9D9D9',
            position: 'relative', cursor: 'pointer', flexShrink: 0,
            transition: 'background-color 0.2s', opacity: saving ? 0.5 : 1,
          }}
        >
          <div style={{
            width: '14px', height: '14px', borderRadius: '50%',
            backgroundColor: '#FFFFFF', position: 'absolute', top: '2px',
            left: item.copa_available ? '16px' : '2px', transition: 'left 0.2s',
          }} />
        </div>
        <img src="/images/hero/copa.png" alt="Copa" style={{ height: '12px', opacity: 0.5 }} />
      </div>
      <div className="flex items-center gap-2">
        <div
          onClick={() => handleToggleBottle(item.id, item.bottle_available)}
          style={{
            width: '32px', height: '18px', borderRadius: '9px',
            backgroundColor: item.bottle_available ? '#C65427' : '#D9D9D9',
            position: 'relative', cursor: 'pointer', flexShrink: 0,
            transition: 'background-color 0.2s', opacity: saving ? 0.5 : 1,
          }}
        >
          <div style={{
            width: '14px', height: '14px', borderRadius: '50%',
            backgroundColor: '#FFFFFF', position: 'absolute', top: '2px',
            left: item.bottle_available ? '16px' : '2px', transition: 'left 0.2s',
          }} />
        </div>
        <img src="/images/hero/botella.png" alt="Botella" style={{ height: '12px', opacity: 0.5 }} />
      </div>
    </>
  ) : (
    // Solo copa, solo botella o precio único — 1 toggle
    <div className="flex items-center gap-2">
      <div
        onClick={() => handleToggle(item.id, item.available)}
        style={{
          width: '40px', height: '22px', borderRadius: '11px',
          backgroundColor: item.available ? '#C65427' : '#D9D9D9',
          position: 'relative', cursor: 'pointer', flexShrink: 0,
          transition: 'background-color 0.2s', opacity: saving ? 0.5 : 1,
        }}
      >
        <div style={{
          width: '18px', height: '18px', borderRadius: '50%',
          backgroundColor: '#FFFFFF', position: 'absolute', top: '2px',
          left: item.available ? '20px' : '2px', transition: 'left 0.2s',
        }} />
      </div>
      {item.price_copa !== null && (
        <img src="/images/hero/copa.png" alt="Copa" style={{ height: '12px', opacity: 0.5 }} />
      )}
      {item.price_bottle !== null && (
        <img src="/images/hero/botella.png" alt="Botella" style={{ height: '12px', opacity: 0.5 }} />
      )}
    </div>
  )}
</div>
                      {/* Info */}
                      <div className="flex flex-col flex-1 mx-4">
                        <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '14px', fontWeight: '600', color: item.available ? '#1A1A1A' : '#9A8878' }}>
                          {item.name_es}
                        </span>
                        <span style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '11px', color: '#9A8878', marginTop: '2px' }}>
                          {item.categoryName}
                          {item.vintage_cellar_do ? ` · ${item.vintage_cellar_do}` : ''}
                        </span>
                      </div>

                      {/* Precio */}
                      <span style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px', color: '#C65427', marginRight: '16px', flexShrink: 0 }}>
                        {item.price_copa && item.price_bottle
                          ? `${formatPrice(item.price_copa)} / ${formatPrice(item.price_bottle)}`
                          : item.price_copa ? formatPrice(item.price_copa)
                          : formatPrice(item.price_bottle)}
                      </span>

                      {/* Botón editar */}
                      <button
  onClick={() => { setEditingItem(item as unknown as MenuItemDB); setTab('añadir') }}
  className="hidden md:block hover:border-[#C65427] hover:text-[#C65427] transition-colors"
  style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '11px', fontWeight: '600', color: '#6A6A6A', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '6px 12px', border: '1px solid #D9D9D9', backgroundColor: 'transparent', cursor: 'pointer', flexShrink: 0 }}
>
  EDITAR
</button>

<button
  onClick={() => { setEditingItem(item as unknown as MenuItemDB); setTab('añadir') }}
  className="md:hidden hover:opacity-70 transition-opacity"
  style={{ 
    color: '#9A8878', 
    fontSize: '16px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    flexShrink: 0,
  }}
>
  ✎
</button>
                    
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

  

        {/* ===== TAB AÑADIR/EDITAR ===== */}
        {tab === 'añadir' && (
          <AddEditForm
            categories={categories}
            editingItem={editingItem}
            adminNombre={adminNombre}
            onSave={async (formData) => {
              try {
                if (editingItem) {
                  await updateItem(editingItem.id, formData)
                  await logActivity(adminNombre, 'UPDATE', 'menu_item', editingItem.id, formData)
                } else {
                  await addItem(formData as Omit<MenuItemDB, 'id' | 'created_at'>)
                  await logActivity(adminNombre, 'CREATE', 'menu_item', undefined, formData)
                }
                refetch()
                setEditingItem(null)
                setTab('productos')
             } catch (err) {
  console.error('Error completo:', JSON.stringify(err))
  alert('Error al guardar: ' + JSON.stringify(err))
}
            }}
            onCancel={() => { setEditingItem(null); setTab('productos') }}
            saving={saving}
          />
        )}

       {/* ===== TAB CATEGORÍAS ===== */}
{tab === 'categorias' && (
  <div>
    {/* SECCIONES EXISTENTES */}
    <p style={{
      fontFamily: 'Nunito Sans, sans-serif',
      fontSize: '10px', fontWeight: '600', color: '#9A8878',
      letterSpacing: '0.25em', textTransform: 'uppercase',
      marginBottom: '12px',
    }}>
      SECCIONES EXISTENTES
    </p>
    <div className="flex flex-col mb-8" style={{ gap: '2px' }}>
      {categories.map(cat => (
  <div
    key={cat.id}
    className="flex items-center justify-between"
    style={{ padding: '10px 14px', backgroundColor: '#FFFFFF', borderBottom: '1px solid rgba(0,0,0,0.06)' }}
  >
    <span style={{
      fontFamily: 'Nunito Sans, sans-serif',
      fontSize: '13px',
      color: cat.available ? '#1A1A1A' : '#9A8878',
      flex: 1,
    }}>
      {cat.name_es}
    </span>

    {/* Botón editar */}
    <button
      onClick={() => setEditingCategory(cat)}
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
        marginRight: '12px',
      }}
    >
      EDITAR
    </button>

    {/* Toggle */}
    <div
      onClick={() => handleToggleCategory(cat.id, cat.available)}
      style={{
        width: '40px', height: '22px', borderRadius: '11px',
        backgroundColor: cat.available ? '#C65427' : '#D9D9D9',
        position: 'relative', cursor: 'pointer',
        transition: 'background-color 0.2s',
      }}
    >
      <div style={{
        width: '18px', height: '18px', borderRadius: '50%',
        backgroundColor: '#FFFFFF', position: 'absolute', top: '2px',
        left: cat.available ? '20px' : '2px', transition: 'left 0.2s',
      }} />
    </div>
  </div>
))}
    </div>

{editingCategory && (
  <div className="flex flex-col mt-8" style={{ gap: '20px', padding: '20px', backgroundColor: '#FFFFFF', border: '1px solid #D9D9D9' }}>
    <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#9A8878', letterSpacing: '0.1em' }}>
      Editando: <strong>{editingCategory.name_es}</strong>
    </p>

    {/* Nombre */}
    <div>
      <span style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '10px', fontWeight: '600', color: '#9A8878', letterSpacing: '0.25em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
        Nombre (castellano)
      </span>
      <input
        type="text"
        defaultValue={editingCategory.name_es}
        id="edit-cat-name"
        style={{ width: '100%', padding: '10px 14px', fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px', color: '#333333', border: '1px solid #D9D9D9', backgroundColor: '#FFFFFF', outline: 'none', boxSizing: 'border-box' as const }}
      />
    </div>

    {/* Tipo precio */}
    <div>
      <span style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '10px', fontWeight: '600', color: '#9A8878', letterSpacing: '0.25em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
        Tipo de precio
      </span>
      <select
        id="edit-cat-price"
        defaultValue={editingCategory.show_price_columns}
        style={{ width: '100%', padding: '10px 14px', fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px', color: '#333333', border: '1px solid #D9D9D9', backgroundColor: '#FFFFFF', outline: 'none' }}
      >
        <option value="none">Precio único</option>
        <option value="copa_only">Solo copa</option>
        <option value="both">Copa y botella</option>
      </select>
    </div>

    {/* Botones */}
    <div className="flex gap-4">
      <button
        onClick={() => setEditingCategory(null)}
        style={{ flex: 1, padding: '12px', fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px', fontWeight: '600', letterSpacing: '0.2em', textTransform: 'uppercase', border: '1px solid #D9D9D9', backgroundColor: 'transparent', color: '#6A6A6A', cursor: 'pointer' }}
      >
        CANCELAR
      </button>
      <button
        onClick={async () => {
          const name = (document.getElementById('edit-cat-name') as HTMLInputElement).value
          const price = (document.getElementById('edit-cat-price') as HTMLSelectElement).value

          // Traduce el nombre
          const [name_ca, name_en, name_fr] = await Promise.all([
            translateText(name, 'ca'),
            translateText(name, 'en'),
            translateText(name, 'fr'),
          ])

          await supabase.from('categories').update({
            name_es: name,
            name_ca,
            name_en,
            name_fr,
            show_price_columns: price,
          }).eq('id', editingCategory.id)

          await logActivity(adminNombre, 'UPDATE', 'category', undefined, { id: editingCategory.id, name_es: name })
          refetch()
          setEditingCategory(null)
        }}
        style={{ flex: 2, padding: '12px', fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px', fontWeight: '600', letterSpacing: '0.2em', textTransform: 'uppercase', border: 'none', backgroundColor: '#C65427', color: '#FFFFFF', cursor: 'pointer' }}
      >
        GUARDAR Y TRADUCIR
      </button>
    </div>
  </div>
)}

    {/* SEPARADOR */}
    <p style={{
      fontFamily: 'Nunito Sans, sans-serif',
      fontSize: '10px', fontWeight: '600', color: '#9A8878',
      letterSpacing: '0.25em', textTransform: 'uppercase',
      marginBottom: '12px', marginTop: '32px',
    }}>
      CREAR NUEVA SECCIÓN
    </p>

    {/* FORMULARIO NUEVA SECCIÓN */}
    <AddCategoryForm
      categories={categories}
      adminNombre={adminNombre}
      onSave={async (newCat) => {
        try {
          const updates = categories
            .filter(c => c.sort_order >= newCat.sort_order)
            .map(c =>
              supabase
                .from('categories')
                .update({ sort_order: c.sort_order + 1 })
                .eq('id', c.id)
            )
          await Promise.all(updates)
          await addCategory(newCat)
          await logActivity(adminNombre, 'CREATE', 'category', undefined, newCat)
          refetch()
          setTab('productos')
        } catch (err) {
          console.error(err)
        }
      }}
      saving={saving}
    />
  </div>
)}

{/* ===== TAB PERFIL ===== */}
{tab === 'perfil' && (
  <PerfilForm />
)}
        {/* ===== TAB TRADUCCIONES ===== */}
        {tab === 'traducciones' && (
          <div className="flex flex-col items-center justify-center py-20">
            <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px', color: '#9A8878', letterSpacing: '0.2em', textAlign: 'center' }}>
              Las traducciones automáticas estarán disponibles<br />cuando el backend esté conectado.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// ===== FORMULARIO AÑADIR/EDITAR =====
function AddEditForm({
  categories,
  editingItem,
  adminNombre,
  onSave,
  onCancel,
  saving,
}: {
  categories: CategoryWithItems[]
  editingItem: MenuItemDB | null
  adminNombre: string
  onSave: (data: Partial<MenuItemDB>) => Promise<void>
  onCancel: () => void
  saving: boolean
}) {
  const [form, setForm] = useState({
    category_id: editingItem?.category_id ?? categories[0]?.id ?? '',
    name_es: editingItem?.name_es ?? '',
    year: editingItem?.year ?? '',
    subcategory: editingItem?.subcategory ?? '',
    vintage_cellar_do: editingItem?.vintage_cellar_do ?? '',
    description_es: editingItem?.description_es ?? '',
    price_copa: editingItem?.price_copa?.toString() ?? '',
    price_bottle: editingItem?.price_bottle?.toString() ?? '',
    available: editingItem?.available ?? true,
  })

  const handleSaveOnly = async () => {
  if (!form.name_es || !form.category_id) return
  await onSave({
    category_id: form.category_id,
    name_es: form.name_es,
    year: form.year || null,
    subcategory: form.subcategory || null,
    vintage_cellar_do: form.vintage_cellar_do || null,
    description_es: form.description_es || null,
    price_copa: form.price_copa ? parseFloat(form.price_copa) : null,
    price_bottle: form.price_bottle ? parseFloat(form.price_bottle) : null,
    available: form.available,
    copa_available: true,
    bottle_available: true,
    sort_order: 0,
  })
}

  const inputStyle = {
    width: '100%', padding: '10px 14px',
    fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px',
    color: '#333333', border: '1px solid #D9D9D9',
    backgroundColor: '#FFFFFF', outline: 'none',
    boxSizing: 'border-box' as const,
  }

  const labelStyle = {
    fontFamily: 'Nunito Sans, sans-serif', fontSize: '10px',
    fontWeight: '600' as const, color: '#9A8878',
    letterSpacing: '0.25em', textTransform: 'uppercase' as const,
    display: 'block', marginBottom: '6px',
  }

  const [translating, setTranslating] = useState(false)
  const [translated, setTranslated] = useState(false)
  const [translateName, setTranslateName] = useState(false)
  const [translateDescription, setTranslateDescription] = useState(true)
  const [translateVintage, setTranslateVintage] = useState(false)
  const [translateSubcategory, setTranslateSubcategory] = useState(false)
    

const handleSubmit = async () => {
  if (!form.name_es || !form.category_id) return

  setTranslating(true)

  const langs: ('ca' | 'en' | 'fr')[] = ['ca', 'en', 'fr']
  const translations: Record<string, string | null> = {}

  for (const lang of langs) {
    translations[`name_${lang}`] = translateName
      ? await translateText(form.name_es, lang)
      : form.name_es

    translations[`description_${lang}`] = translateDescription && form.description_es
      ? await translateText(form.description_es, lang)
      : form.description_es || null

    translations[`vintage_cellar_do_${lang}`] = translateVintage && form.vintage_cellar_do
      ? await translateText(form.vintage_cellar_do, lang)
      : form.vintage_cellar_do || null

    translations[`subcategory_${lang}`] = translateSubcategory && form.subcategory
      ? await translateText(form.subcategory, lang)
      : form.subcategory || null
  }

  setTranslating(false)
  setTranslated(true)

  await onSave({
    category_id: form.category_id,
    name_es: form.name_es,
    name_ca: translations.name_ca,
    name_en: translations.name_en,
    name_fr: translations.name_fr,
    year: form.year || null,
    subcategory: form.subcategory || null,
    subcategory_ca: translations.subcategory_ca,
    subcategory_en: translations.subcategory_en,
    subcategory_fr: translations.subcategory_fr,
    vintage_cellar_do: form.vintage_cellar_do || null,
    vintage_cellar_do_ca: translations.vintage_cellar_do_ca,
    vintage_cellar_do_en: translations.vintage_cellar_do_en,
    vintage_cellar_do_fr: translations.vintage_cellar_do_fr,
    description_es: form.description_es || null,
    description_ca: translations.description_ca,
    description_en: translations.description_en,
    description_fr: translations.description_fr,
    price_copa: form.price_copa ? parseFloat(form.price_copa) : null,
    price_bottle: form.price_bottle ? parseFloat(form.price_bottle) : null,
    available: form.available,
    copa_available: true,
    bottle_available: true,
    sort_order: 0,
  })
}
  return (
    <div>
      <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#9A8878', letterSpacing: '0.1em', marginBottom: '24px' }}>
        {editingItem ? 'Edita el producto.' : 'Introduce los datos en castellano. Las traducciones a CA · EN · FR se generarán automáticamente con IA.'}
      </p>

      <div className="flex flex-col" style={{ gap: '20px' }}>

        {/* SECCIÓN */}
        <div>
          <span style={labelStyle}>Sección</span>
          <select value={form.category_id} onChange={e => setForm({ ...form, category_id: e.target.value })} style={inputStyle}>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name_es}</option>
            ))}
          </select>
        </div>

        {/* NOMBRE */}
        <div>
          <span style={labelStyle}>Nombre (castellano)</span>
          <input type="text" value={form.name_es} onChange={e => setForm({ ...form, name_es: e.target.value })} placeholder="Ej: El Veïnat" style={inputStyle} />
        </div>

        {/* AÑO */}
<div>
  <span style={labelStyle}>Año</span>
  <input
    type="text"
    value={form.year}
    onChange={e => setForm({ ...form, year: e.target.value })}
    placeholder="Ej: 2023"
    style={inputStyle}
  />
</div>

{/* SUBCATEGORÍA */}
<div>
  <span style={labelStyle}>Subcategoría (opcional)</span>
  <input
    type="text"
    value={form.subcategory}
    onChange={e => setForm({ ...form, subcategory: e.target.value })}
    placeholder="Ej: Barril, Botella"
    style={inputStyle}
  />
</div>

{/* BODEGA · D.O. */}
<div>
  <span style={labelStyle}>Bodega · D.O.</span>
  <input
    type="text"
    value={form.vintage_cellar_do}
    onChange={e => setForm({ ...form, vintage_cellar_do: e.target.value })}
    placeholder="Ej: Viñedos Singulares · Montsant"
    style={inputStyle}
  />
</div>

        {/* DESCRIPCIÓN */}
        <div>
          <span style={labelStyle}>Descripción (castellano)</span>
          <textarea value={form.description_es} onChange={e => setForm({ ...form, description_es: e.target.value })} placeholder="Describe el producto..." rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
        </div>

        {/* PRECIOS */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span style={labelStyle}>Precio Copa (€)</span>
            <input type="number" value={form.price_copa} onChange={e => setForm({ ...form, price_copa: e.target.value })} placeholder="Ej: 5.50" step="0.10" min="0" style={inputStyle} />
          </div>
          <div>
            <span style={labelStyle}>Precio Botella (€)</span>
            <input type="number" value={form.price_bottle} onChange={e => setForm({ ...form, price_bottle: e.target.value })} placeholder="Ej: 24.00" step="0.10" min="0" style={inputStyle} />
          </div>
        </div>

        {/* DISPONIBLE */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => setForm({ ...form, available: !form.available })}
            style={{
              width: '40px', height: '22px', borderRadius: '11px',
              backgroundColor: form.available ? '#C65427' : '#D9D9D9',
              position: 'relative', cursor: 'pointer', transition: 'background-color 0.2s',
            }}
          >
            <div style={{
              width: '18px', height: '18px', borderRadius: '50%',
              backgroundColor: '#FFFFFF', position: 'absolute', top: '2px',
              left: form.available ? '20px' : '2px', transition: 'left 0.2s',
            }} />
          </div>
          <span style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#6A6A6A' }}>
            {form.available ? 'Disponible en carta' : 'No disponible'}
          </span>
        </div>

{/* OPCIONES DE TRADUCCIÓN */}
<div className="flex flex-col gap-2" style={{ padding: '12px', backgroundColor: '#F9F9F9', border: '1px solid #E9E9E9' }}>
  <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '10px', fontWeight: '600', color: '#9A8878', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '4px' }}>
    Traducir automáticamente
  </p>
  <label className="flex items-center gap-2" style={{ cursor: 'pointer' }}>
    <input type="checkbox" checked={translateName} onChange={e => setTranslateName(e.target.checked)} />
    <span style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#6A6A6A' }}>Nombre del producto</span>
  </label>
  <label className="flex items-center gap-2" style={{ cursor: 'pointer' }}>
    <input type="checkbox" checked={translateDescription} onChange={e => setTranslateDescription(e.target.checked)} />
    <span style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#6A6A6A' }}>Descripción</span>
  </label>
  <label className="flex items-center gap-2" style={{ cursor: 'pointer' }}>
    <input type="checkbox" checked={translateVintage} onChange={e => setTranslateVintage(e.target.checked)} />
    <span style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#6A6A6A' }}>Bodega · D.O.</span>
  </label>
  <label className="flex items-center gap-2" style={{ cursor: 'pointer' }}>
    <input type="checkbox" checked={translateSubcategory} onChange={e => setTranslateSubcategory(e.target.checked)} />
    <span style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#6A6A6A' }}>Subcategoría</span>
  </label>
</div>

      {/* BOTONES */}
<div className="flex gap-4">
  <button
    onClick={onCancel}
    style={{ flex: 1, padding: '14px', fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px', fontWeight: '600', letterSpacing: '0.2em', textTransform: 'uppercase', border: '1px solid #D9D9D9', backgroundColor: 'transparent', color: '#6A6A6A', cursor: 'pointer' }}
  >
    CANCELAR
  </button>
  <button
    onClick={handleSaveOnly}
    disabled={saving}
    style={{ flex: 1, padding: '14px', fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px', fontWeight: '600', letterSpacing: '0.2em', textTransform: 'uppercase', border: 'none', backgroundColor: saving ? '#9A8878' : '#6A6A6A', color: '#FFFFFF', cursor: saving ? 'not-allowed' : 'pointer' }}
  >
    {saving ? 'GUARDANDO...' : 'GUARDAR'}
  </button>
  <button
    onClick={handleSubmit}
    disabled={saving || translating}
    style={{ flex: 2, padding: '14px', fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px', fontWeight: '600', letterSpacing: '0.2em', textTransform: 'uppercase', border: 'none', backgroundColor: saving || translating ? '#9A8878' : '#C65427', color: '#FFFFFF', cursor: saving || translating ? 'not-allowed' : 'pointer' }}
  >
    {translating ? 'TRADUCIENDO...' : saving ? 'GUARDANDO...' : editingItem ? 'GUARDAR Y TRADUCIR' : 'AÑADIR Y TRADUCIR'}
  </button>
</div>

{translated && !saving && (
  <p style={{
    fontFamily: 'Nunito Sans, sans-serif',
    fontSize: '12px', color: '#C65427',
    letterSpacing: '0.2em', textAlign: 'center',
  }}>
    ✓ TRADUCIDO Y GUARDADO EN CA · EN · FR
  </p>
)}
        </div>
      </div>
      
    


  )
}

function AddCategoryForm({
  categories,
  adminNombre,
  onSave,
  saving,
}: {
  categories: CategoryWithItems[]
  adminNombre: string
  onSave: (data: any) => Promise<void>
  saving: boolean
}) {

  const [loading, setLoading] = useState(false)
  
  const [form, setForm] = useState({
    id: '',
    name_es: '',
    show_price_columns: 'none' as 'both' | 'copa_only' | 'none',
    sort_order: categories.length + 1,
  })

  const inputStyle = {
    width: '100%', padding: '10px 14px',
    fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px',
    color: '#333333', border: '1px solid #D9D9D9',
    backgroundColor: '#FFFFFF', outline: 'none',
    boxSizing: 'border-box' as const,
  }

  const labelStyle = {
    fontFamily: 'Nunito Sans, sans-serif', fontSize: '10px',
    fontWeight: '600' as const, color: '#9A8878',
    letterSpacing: '0.25em', textTransform: 'uppercase' as const,
    display: 'block', marginBottom: '6px',
  }

  const handleSubmit = async () => {
  if (!form.name_es || !form.id) return

  setLoading(true)

  const [name_ca, name_en, name_fr] = await Promise.all([
    translateText(form.name_es, 'ca'),
    translateText(form.name_es, 'en'),
    translateText(form.name_es, 'fr'),
  ])

  await onSave({
    id: form.id.toLowerCase().replace(/\s+/g, '_'),
    name_es: form.name_es,
    name_ca,
    name_en,
    name_fr,
    show_price_columns: form.show_price_columns,
    sort_order: form.sort_order,
  })

  setLoading(false)
}

  return (
    <div>
      <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#9A8878', letterSpacing: '0.1em', marginBottom: '24px' }}>
        Crea una nueva sección para la carta. El nombre se traducirá automáticamente con IA.
      </p>

      <div className="flex flex-col" style={{ gap: '20px' }}>

        {/* ID */}
        <div>
          <span style={labelStyle}>ID (sin espacios, en minúsculas)</span>
          <input
            type="text"
            value={form.id}
            onChange={e => setForm({ ...form, id: e.target.value.toLowerCase().replace(/\s+/g, '_') })}
            placeholder="Ej: vinos_naturales"
            style={inputStyle}
          />
        </div>

        {/* NOMBRE */}
        <div>
          <span style={labelStyle}>Nombre (castellano)</span>
          <input
            type="text"
            value={form.name_es}
            onChange={e => setForm({ ...form, name_es: e.target.value })}
            placeholder="Ej: Vinos Naturales"
            style={inputStyle}
          />
        </div>

        {/* TIPO DE PRECIO */}
        <div>
          <span style={labelStyle}>Tipo de precio</span>
          <select
            value={form.show_price_columns}
            onChange={e => setForm({ ...form, show_price_columns: e.target.value as 'both' | 'copa_only' | 'none' })}
            style={inputStyle}
          >
            <option value="none">Precio único</option>
            <option value="copa_only">Solo copa</option>
            <option value="both">Copa y botella</option>
          </select>
        </div>

        {/* POSICIÓN */}
        <div>
          <span style={labelStyle}>Posición en la carta</span>
          <select
            value={form.sort_order}
            onChange={e => setForm({ ...form, sort_order: parseInt(e.target.value) })}
            style={inputStyle}
          >
            <option value={1}>Al inicio</option>
            {categories.map((cat, i) => (
              <option key={cat.id} value={i + 2}>
                Después de {cat.name_es}
              </option>
            ))}
          </select>
        </div>

        {/* BOTÓN */}
       <button
  onClick={handleSubmit}
  disabled={saving || loading || !form.name_es || !form.id}
  style={{
    padding: '14px',
    fontFamily: 'Nunito Sans, sans-serif',
    fontSize: '13px', fontWeight: '600',
    letterSpacing: '0.2em', textTransform: 'uppercase',
    border: 'none',
    backgroundColor: saving || loading ? '#9A8878' : '#C65427',
    color: '#FFFFFF',
    cursor: saving || loading ? 'not-allowed' : 'pointer',
    width: '100%',
  }}
>
  {loading ? 'TRADUCIENDO...' : saving ? 'GUARDANDO...' : 'CREAR SECCIÓN'}
</button>
      </div>
    </div>   
  )
}

function PerfilForm() {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'mismatch'>('idle')
  const [loading, setLoading] = useState(false)

  const inputStyle = {
    width: '100%', padding: '10px 14px',
    fontFamily: 'Nunito Sans, sans-serif', fontSize: '13px',
    color: '#333333', border: '1px solid #D9D9D9',
    backgroundColor: '#FFFFFF', outline: 'none',
    boxSizing: 'border-box' as const,
  }

  const labelStyle = {
    fontFamily: 'Nunito Sans, sans-serif', fontSize: '10px',
    fontWeight: '600' as const, color: '#9A8878',
    letterSpacing: '0.25em', textTransform: 'uppercase' as const,
    display: 'block', marginBottom: '6px',
  }

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) return
    if (newPassword !== confirmPassword) {
      setStatus('mismatch')
      return
    }
    if (newPassword.length < 6) {
      setStatus('error')
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    setLoading(false)

    if (error) {
      setStatus('error')
    } else {
      setStatus('success')
      setNewPassword('')
      setConfirmPassword('')
    }
  }

  return (
    <div>
      <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#9A8878', letterSpacing: '0.1em', marginBottom: '24px' }}>
        Cambia tu contraseña de acceso al panel.
      </p>

      <div className="flex flex-col" style={{ gap: '20px', maxWidth: '400px' }}>

        <div>
          <span style={labelStyle}>Nueva contraseña</span>
          <input
            type="password"
            value={newPassword}
            onChange={e => { setNewPassword(e.target.value); setStatus('idle') }}
            placeholder="Mínimo 6 caracteres"
            style={inputStyle}
          />
        </div>

        <div>
          <span style={labelStyle}>Confirmar contraseña</span>
          <input
            type="password"
            value={confirmPassword}
            onChange={e => { setConfirmPassword(e.target.value); setStatus('idle') }}
            placeholder="Repite la contraseña"
            style={inputStyle}
          />
        </div>

        {status === 'mismatch' && (
          <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#C65427', letterSpacing: '0.1em' }}>
            Las contraseñas no coinciden.
          </p>
        )}
        {status === 'error' && (
          <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#C65427', letterSpacing: '0.1em' }}>
            Error al cambiar la contraseña. Mínimo 6 caracteres.
          </p>
        )}
        {status === 'success' && (
          <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '12px', color: '#C65427', letterSpacing: '0.1em' }}>
            ✓ Contraseña actualizada correctamente.
          </p>
        )}

        <button
          onClick={handleChangePassword}
          disabled={loading}
          style={{
            padding: '14px',
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '13px', fontWeight: '600',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            border: 'none',
            backgroundColor: loading ? '#9A8878' : '#C65427',
            color: '#FFFFFF',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'GUARDANDO...' : 'CAMBIAR CONTRASEÑA'}
        </button>
      </div>
    </div>
  )
}