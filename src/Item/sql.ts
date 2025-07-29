import * as database from '@/database'
import * as type from './types'

export const insert = database.db.prepare<type.CreateQuery, type.CreateResult>(`
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

export const selectAll = database.db.prepare<type.ReadQuery, type.ReadResult[]>(`
  SELECT
    id,
    created_at,
    updated_at,
    body
  FROM 
    to_do
`)

export const selectById = database.db.prepare<type.ReadQuery, type.ReadResult[]>(`
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

export const updateById = database.db.prepare<type.UpdateQuery, type.UpdateResult>(`
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

export const deleteById = database.db.prepare<type.DeleteQuery, type.DeleteResult>(`
  DELETE FROM 
    to_do 
  WHERE 
    id = ?
`)
