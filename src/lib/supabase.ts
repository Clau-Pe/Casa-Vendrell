import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// Tipos de la base de datos
export type CategoryDB = {
  id: string
  name_es: string
  name_ca: string | null
  name_en: string | null
  name_fr: string | null
  show_price_columns: 'both' | 'copa_only' | 'none'
  sort_order: number
  available: boolean  
  created_at: string
}

export type MenuItemDB = {
  id: number
  category_id: string
  subcategory: string | null 
  name_es: string
  name_ca: string | null
  name_en: string | null
  name_fr: string | null
   year: string | null  
  vintage_cellar_do: string | null
  description_es: string | null
  description_ca: string | null
  description_en: string | null
  description_fr: string | null
  price_copa: number | null
  price_bottle: number | null
  available: boolean
  copa_available: boolean
  bottle_available: boolean
  sort_order: number
  created_at: string
}