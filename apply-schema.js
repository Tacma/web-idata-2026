import { readFileSync } from 'fs'
import https from 'https'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const serviceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('Missing Supabase environment variables')
}

function executeSQL(sql) {
  return new Promise((resolve, reject) => {
    const url = `${supabaseUrl}/rest/v1/rpc/exec_sql`
    const data = JSON.stringify({ sql })

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${serviceRoleKey}`,
        'apikey': serviceRoleKey
      }
    }

    const req = https.request(url, options, (res) => {
      let body = ''
      res.on('data', (chunk) => body += chunk)
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(body))
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`))
        }
      })
    })

    req.on('error', reject)
    req.write(data)
    req.end()
  })
}

async function runSchema() {
  try {
    console.log('Reading schema file...')
    const schemaSQL = readFileSync('./supabase-schema.sql', 'utf8')

    console.log('Executing schema...')
    await executeSQL(schemaSQL)

    console.log('Schema executed successfully')

  } catch (e) {
    console.error('Error executing schema:', e.message)
    // Try executing statements one by one
    console.log('Trying individual statements...')
    const schemaSQL = readFileSync('./supabase-schema.sql', 'utf8')
    const statements = schemaSQL.split(';').filter(stmt => stmt.trim().length > 0)

    for (const statement of statements.slice(0, 10)) { // First 10 statements
      if (statement.trim()) {
        try {
          console.log('Executing:', statement.substring(0, 50) + '...')
          await executeSQL(statement)
        } catch (stmtError) {
          console.log('Statement error (might be expected):', stmtError.message)
        }
      }
    }
  }
}

runSchema()