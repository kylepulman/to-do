import db from './database'

import * as global from './schema'

export const selectById = db.prepare<string, global.ListItemT>(`
  SELECT
    id,
    created_at,
    updated_at,
    body
  FROM 
    to_do
  WHERE 
    id = ?
`)

export const selectAll = db.prepare<[], global.ListItemT>(`
  SELECT
    id,
    created_at,
    updated_at,
    body
  FROM 
    to_do
`)
