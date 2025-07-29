import * as z from 'zod'
import * as schema from './schema'

export const Values = z.tuple([
  schema.ListItem.shape.id,
  schema.ListItem.shape.created_at,
  schema.ListItem.shape.updated_at,
  schema.ListItem.shape.body,
])

export type ValuesT = z.infer<typeof Values>

export type InputT = schema.ListItemT['body']

export const Query = schema.ListItem
