import * as z from 'zod'

export const ListItem = z.strictObject({
  id: z.uuidv4(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
  body: z.string(),
})

export type ListItemT = z.infer<typeof ListItem>

export const ListItems = z.array(ListItem)
