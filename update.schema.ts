import * as z from 'zod'
import * as schema from './schema'

const _Input = schema.ListItem.pick({
  id: true,
  body: true,
})

export type InputT = z.infer<typeof _Input>

export const Values = z.tuple([
  schema.ListItem.shape.body,
  schema.ListItem.shape.updated_at,
  schema.ListItem.shape.id,
])

export type ValuesT = z.infer<typeof Values>

export const Query = schema.ListItem.omit({ created_at: true })

export type QueryT = z.infer<typeof Query>
