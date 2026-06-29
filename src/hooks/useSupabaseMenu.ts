import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import type { CategoryDB, MenuItemDB } from '../lib/supabase'

export type CategoryWithItems = CategoryDB & {
  items: MenuItemDB[]
}

export function useSupabaseMenu() {
  const [categories, setCategories] = useState<CategoryWithItems[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [trigger, setTrigger] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        setLoading(true)

        // Carga categorías ordenadas
        const { data: cats, error: catsError } = await supabase
          .from('categories')
          .select('*')
          .order('sort_order')

        if (catsError) throw catsError

        // Carga productos disponibles ordenados
        const { data: items, error: itemsError } = await supabase
          .from('menu_items')
          .select('*')
          .order('price_copa', { ascending: true, nullsFirst: false })

        if (itemsError) throw itemsError

        // Agrupa productos por categoría
        const result = (cats ?? []).map(cat => ({
          ...cat,
          items: (items ?? []).filter(i => i.category_id === cat.id)
        }))

        if (!cancelled) setCategories(result)
      } catch (err) {
        if (!cancelled) setError('Error al cargar la carta')
        console.error(err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [trigger])

  const refetch = useCallback(() => setTrigger(t => t + 1), [])

  return { categories, loading, error, refetch }
}