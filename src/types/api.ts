// Respuesta estándar de la API — genérica para cualquier tipo de dato
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}