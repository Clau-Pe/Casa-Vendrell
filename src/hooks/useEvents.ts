import { useState, useEffect, useCallback } from 'react';
import { getEvents } from '../api/events';
import type { Event } from '../types/events';

interface UseEventsReturn {
  events: Event[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useEvents(): UseEventsReturn {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await getEvents();
        if (!cancelled) setEvents(data);
      } catch (err) {
        if (!cancelled) setError('Error al cargar los eventos.');
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

  return { events, loading, error, refetch };
}