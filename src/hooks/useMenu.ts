import { useState, useEffect, useCallback } from 'react';
import { getMenu } from '../api/menu';
import type { MenuItem } from '../types/menu';

interface UseMenuReturn {
  menu: MenuItem[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useMenu(): UseMenuReturn {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await getMenu();
        if (!cancelled) setMenu(data);
      } catch (err) {
        if (!cancelled) setError('Error al cargar la carta.');
        console.error(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [trigger]);

  const refetch = useCallback(() => setTrigger(t => t + 1), []);

  return { menu, loading, error, refetch };
}