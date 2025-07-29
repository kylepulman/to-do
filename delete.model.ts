import db from './database'

export const deleteById = db.prepare<string, number>(`
  DELETE FROM 
    to_do 
  WHERE 
    id = ?
`)
