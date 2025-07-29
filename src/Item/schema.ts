import * as zod from 'zod'

const ItemZ = zod.strictObject({
  id: zod.uuidv4(),
  created_at: zod.iso.datetime(),
  updated_at: zod.iso.datetime(),
  body: zod.string(),
})

export const Create = {
  input: ItemZ.shape.body,
  query: zod.tuple([
    ItemZ.shape.id,
    ItemZ.shape.created_at,
    ItemZ.shape.updated_at,
    ItemZ.shape.body,
  ]),
  result: ItemZ,
  output: ItemZ,
}

export const Read = {
  input: ItemZ.shape.id.optional(),
  query: zod.tuple([
    ItemZ.shape.id.optional(),
  ]),
  result: zod.array(ItemZ),
  output: zod.array(ItemZ),
}

export const Update = {
  input: ItemZ.pick({
    id: true,
    body: true,
  }),
  query: zod.tuple([
    ItemZ.shape.body,
    ItemZ.shape.updated_at,
    ItemZ.shape.id,
  ]),
  result: ItemZ,
  output: ItemZ,
}

export const Delete = {
  input: ItemZ.shape.id,
  query: zod.tuple([
    ItemZ.shape.id,
  ]),
  result: zod.literal(1),
  output: zod.literal(1),
}
