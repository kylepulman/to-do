import db from './database'

import * as local from './update.schema'
import * as global from './schema'

export const updateById = db.prepare<local.ValuesT, global.ListItemT>(`
  UPDATE 
    to_do 
  SET 
    body = ?, 
    updated_at = ? 
  WHERE 
    id = ?
  RETURNING 
    id, 
    created_at, 
    updated_at, 
    body
`)
