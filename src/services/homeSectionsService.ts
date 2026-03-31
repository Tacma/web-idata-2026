import { supabase } from '../lib/supabase'
import type { HomeSection } from '../app/shared/types'

function snakeToCamel(obj: any): any {
  if (obj === null || obj === undefined) return obj
  if (Array.isArray(obj)) return obj.map(snakeToCamel)
  if (typeof obj !== 'object') return obj
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      const camelKey = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase())
      return [camelKey, snakeToCamel(value)]
    })
  )
}

export async function getHomeSections(language?: 'es' | 'en', pageSlug = 'home'): Promise<HomeSection[]> {
  let query = supabase.from('home_sections').select('*')
  if (language) {
    query = query.eq('language', language)
  }
  query = query.eq('page_slug', pageSlug)
  query = query.order('order', { ascending: true })

  const { data, error } = await query
  if (error) throw error
  if (!data) return []

  return data.map((row: any) => {
    const section = snakeToCamel(row)

    // Ensure boolean normalization
    return {
      ...section,
      isEnabled: section.isEnabled ?? true,
    } as HomeSection
  })
}
