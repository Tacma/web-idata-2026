import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseServiceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

async function runSchema() {
  try {
    console.log('Reading schema file...')
    const schemaSQL = readFileSync('./supabase-schema.sql', 'utf8')

    console.log('Executing schema...')
    const { error } = await supabase.rpc('exec_sql', { sql: schemaSQL })

    if (error) {
      console.error('Error executing schema:', error)
      // Try executing statements one by one
      const statements = schemaSQL.split(';').filter(stmt => stmt.trim().length > 0)

      for (const statement of statements) {
        if (statement.trim()) {
          console.log('Executing:', statement.substring(0, 50) + '...')
          const { error: stmtError } = await supabase.rpc('exec_sql', { sql: statement })
          if (stmtError) {
            console.log('Statement error (might be expected):', stmtError.message)
          }
        }
      }
    } else {
      console.log('Schema executed successfully')
    }

  } catch (e) {
    console.error('Error:', e.message)
  }
}

runSchema()