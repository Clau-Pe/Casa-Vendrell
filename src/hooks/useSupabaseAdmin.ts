import { useState } from 'react'
import { supabase } from '../lib/supabase'
import type { MenuItemDB, CategoryDB } from '../lib/supabase'

export function useSupabaseAdmin() {

  const [saving, setSaving] = useState(false)

  // Toggle disponibilidad producto
  const toggleItem = async (id: number, available: boolean) => {
    setSaving(true)
    const { error } = await supabase
      .from('menu_items')
      .update({ available })
      .eq('id', id)
    setSaving(false)
    if (error) throw error
  }

  // Añadir producto
const addItem = async (item: Omit<MenuItemDB, 'id' | 'created_at'>) => {
  setSaving(true)
  console.log('Enviando a Supabase:', JSON.stringify(item))
  const { data, error } = await supabase
    .from('menu_items')
    .insert(item)
    .select()
    .single()
  setSaving(false)
  if (error) throw error
  return data
}

  // Editar producto
  const updateItem = async (id: number, item: Partial<MenuItemDB>) => {
    setSaving(true)
    const { error } = await supabase
      .from('menu_items')
      .update(item)
      .eq('id', id)
    setSaving(false)
    if (error) throw error
  }

  // Eliminar producto
  const deleteItem = async (id: number) => {
    setSaving(true)
    const { error } = await supabase
      .from('menu_items')
      .delete()
      .eq('id', id)
    setSaving(false)
    if (error) throw error
  }

  // Añadir categoría
  const addCategory = async (category: Omit<CategoryDB, 'created_at'>) => {
    setSaving(true)
    const { data, error } = await supabase
      .from('categories')
      .insert(category)
      .select()
      .single()
    setSaving(false)
    if (error) throw error
    return data
  }

  // Reordenar categorías
  const reorderCategories = async (categories: { id: string, sort_order: number }[]) => {
    setSaving(true)
    const updates = categories.map(cat =>
      supabase.from('categories').update({ sort_order: cat.sort_order }).eq('id', cat.id)
    )
    await Promise.all(updates)
    setSaving(false)
  }

  // Registrar cambio en activity_log
  const logActivity = async (
    adminNombre: string,
    accion: string,
    entidad: string,
    entidadId?: number,
    detalle?: object
  ) => {
    await supabase.from('activity_log').insert({
      admin_nombre: adminNombre,
      accion,
      entidad,
      entidad_id: entidadId,
      detalle,
    })
  }

  return { saving, toggleItem, addItem, updateItem, deleteItem, addCategory, reorderCategories, logActivity }
}