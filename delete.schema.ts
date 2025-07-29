import * as z from 'zod'
import * as schema from './schema'

export const Input = schema.ListItem.shape.id

export type InputT = z.infer<typeof Input>

export const Output = z.literal(1)
