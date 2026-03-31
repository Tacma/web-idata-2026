import { supabase } from '../../../lib/supabaseClient';
import { getSettings, saveSettings, type CollectionKey } from './localStorage.service';

const SETTINGS_TABLE = 'site_settings';

function isMissingSettingsTable(error: any) {
  const message = `${error?.message || ''} ${error?.details || ''} ${error?.hint || ''}`;
  return message.includes("Could not find the table 'public.site_settings'") || message.includes('site_settings');
}

function canUseLocalStorage() {
  return typeof window !== 'undefined';
}

function readLocalSetting<T>(key: CollectionKey, fallback: T): T {
  if (!canUseLocalStorage()) return fallback;
  return getSettings<T>(key) ?? fallback;
}

function writeLocalSetting<T>(key: CollectionKey, value: T) {
  if (!canUseLocalStorage()) return;
  saveSettings(key, value);
}

export function getCachedSiteSetting<T>(localKey: CollectionKey, fallback: T): T {
  return readLocalSetting(localKey, fallback);
}

export async function getSiteSetting<T>(
  settingKey: string,
  localKey: CollectionKey,
  fallback: T,
): Promise<T> {
  try {
    const { data, error } = await supabase
      .from(SETTINGS_TABLE)
      .select('value')
      .eq('key', settingKey)
      .maybeSingle();

    if (error) {
      throw error;
    }

    const value = (data?.value ?? fallback) as T;
    writeLocalSetting(localKey, value);
    return value;
  } catch (error) {
    if (!isMissingSettingsTable(error)) {
      console.error(`Error loading site setting "${settingKey}":`, error);
    }
    return readLocalSetting(localKey, fallback);
  }
}

export async function saveSiteSetting<T>(
  settingKey: string,
  localKey: CollectionKey,
  value: T,
): Promise<T> {
  try {
    const payload = {
      key: settingKey,
      value,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from(SETTINGS_TABLE)
      .upsert(payload, { onConflict: 'key' });

    if (error) {
      throw error;
    }
  } catch (error) {
    if (!isMissingSettingsTable(error)) {
      console.error(`Error saving site setting "${settingKey}":`, error);
      throw error;
    }
  }

  writeLocalSetting(localKey, value);
  return value;
}
