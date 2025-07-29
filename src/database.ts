import Database from 'better-sqlite3'

export const db = new Database('database')

db.exec(`
  CREATE TABLE IF NOT EXISTS to_do (
    id UUID PRIMARY KEY,
    created_at timestamptz,
    updated_at timestamptz,
    body TEXT UNIQUE
  )
`)
