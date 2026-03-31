import { supabase } from '../lib/supabase'
import { normalizeTestimonial } from './contentUtils'

export const getPublished = async () => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('status', 'published')
    .order('order', { ascending: true })
  if (error) throw error
  return (data || []).map(normalizeTestimonial)
}
