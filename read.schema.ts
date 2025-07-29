import * as z from 'zod'
import * as schema from './schema'

export const Input = schema.ListItem.shape.id.optional()

export type InputT = z.infer<typeof Input>
