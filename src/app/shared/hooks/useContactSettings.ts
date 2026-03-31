import { useEffect, useState } from 'react';
import {
  defaultContactSettings,
  getContactSettings,
  normalizeContactSettings,
  type ContactSettings,
} from '../services/contactSettings';

export function useContactSettings() {
  const [settings, setSettings] = useState<ContactSettings>(defaultContactSettings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        const data = await getContactSettings();
        if (!cancelled) {
          setSettings(normalizeContactSettings(data));
          setError(null);
        }
      } catch (loadError) {
        if (!cancelled) {
          setSettings(defaultContactSettings);
          setError(loadError instanceof Error ? loadError : new Error('Failed to load contact settings'));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { settings, loading, error };
}
