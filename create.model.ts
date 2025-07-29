import db from './database'

import * as local from './create.schema'
import * as global from './schema'

export const insert = db.prepare<local.ValuesT, global.ListItemT>(`
  INSERT INTO to_do (
    id, 
    created_at, 
    updated_at, 
    body
  ) 
  VALUES (
    ?,
    ?,
    ?,
    ?
  )
  RETURNING 
    id, 
    created_at, 
    updated_at, 
    body
`)
