// URL base del servidor
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api/v1';

/**
 * Obtiene el token JWT guardado en localStorage
 */
function getToken(): string | null {
  return localStorage.getItem('token');
}

/**
 * Construye los headers de cada petición
 * Si hay token lo añade automáticamente
 */
function buildHeaders(withAuth: boolean = false): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (withAuth) {
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
}

/**
 * Petición GET
 */
export async function apiGet<T>(
  endpoint: string,
  withAuth: boolean = false
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'GET',
    headers: buildHeaders(withAuth),
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Petición POST
 */
export async function apiPost<T>(
  endpoint: string,
  body: unknown,
  withAuth: boolean = false
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: buildHeaders(withAuth),
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Petición PATCH
 */
export async function apiPatch<T>(
  endpoint: string,
  body: unknown,
  withAuth: boolean = false
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'PATCH',
    headers: buildHeaders(withAuth),
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Petición DELETE
 */
export async function apiDelete(
  endpoint: string,
  withAuth: boolean = false
): Promise<void> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'DELETE',
    headers: buildHeaders(withAuth),
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
}