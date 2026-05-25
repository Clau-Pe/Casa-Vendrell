export type MenuCategory =
  | 'vermut'
  | 'espumos'
  | 'vinos_copa'
  | 'vins_blancs'
  | 'vins_rosats'
  | 'vins_negres'
  | 'fortificats'
  | 'vins_licors_postre'
  | 'destilats'
  | 'cocktail'
  | 'cerveses'
  | 'begudes_sense_alcohol'
  | 'per_acompanyar';

export interface MenuItem {
  id: number;
  category: MenuCategory;
  name: string;
  vintage_cellar_do?: string;
  description?: string;
  price_copa?: number;
  price_bottle?: number;
  available: boolean;
  created_at?: string;
}

export interface CreateMenuItemDto {
  category: MenuCategory;
  name: string;
  vintage_cellar_do?: string;
  description?: string;
  price_copa?: number;
  price_bottle?: number;
  available: boolean;
}

export type UpdateMenuItemDto = Partial<CreateMenuItemDto>;