import * as database from '@/database'
import * as zod from 'zod'

// Schema
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

// Types
type CreateInput = zod.infer<typeof Create.input>
type CreateQuery = zod.infer<typeof Create.query>
type CreateResult = zod.infer<typeof Create.result>
type CreateOutput = zod.infer<typeof Create.output>

type ReadInput = zod.infer<typeof Read.input>
type ReadQuery = zod.infer<typeof Read.query>
type ReadResult = zod.infer<typeof Read.result>
type ReadOutput = zod.infer<typeof Read.output>

type UpdateInput = zod.infer<typeof Update.input>
type UpdateQuery = zod.infer<typeof Update.query>
type UpdateResult = zod.infer<typeof Update.result>
type UpdateOutput = zod.infer<typeof Update.output>

type DeleteInput = zod.infer<typeof Delete.input>
type DeleteQuery = zod.infer<typeof Delete.query>
type DeleteResult = zod.infer<typeof Delete.result>
type DeleteOutput = zod.infer<typeof Delete.output>

// SQL
const insert = database.db.prepare<CreateQuery, CreateResult>(`
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

const selectAll = database.db.prepare<ReadQuery, ReadResult[]>(`
  SELECT
    id,
    created_at,
    updated_at,
    body
  FROM 
    to_do
`)

const selectById = database.db.prepare<ReadQuery, ReadResult[]>(`
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

const updateById = database.db.prepare<UpdateQuery, UpdateResult>(`
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

const deleteById = database.db.prepare<DeleteQuery, DeleteResult>(`
  DELETE FROM 
    to_do 
  WHERE 
    id = ?
`)

// Models
const model = {
  create(body: CreateInput) {
    const now = new Date().toISOString()

    const query = Create.query.parse([
      crypto.randomUUID(),
      now,
      now,
      body,
    ])

    return Create.result.parse(insert.get(...query))
  },

  read(id: ReadInput) {
    const query = Read.query.parse([
      id,
    ])

    return Read.result.parse(
      query[0]
        ? selectById.all(...query)
        : selectAll.all(),
    )
  },

  update(input: UpdateInput) {
    console.log('input', input)

    const query = Update.query.parse([
      input.body,
      new Date().toISOString(),
      input.id,
    ])

    console.log('query', query)

    return Update.result.parse(updateById.get(...query))
  },

  obliterate(id: DeleteInput) {
    const query = Delete.query.parse([
      id,
    ])

    return Delete.result.parse(deleteById.run(...query).changes)
  },
}

// Controllers
export function create(input: CreateInput): CreateOutput {
  const body = Create.input.parse(input)

  const result = model.create(body)

  return Create.output.parse(result)
}

export function read(input: ReadInput): ReadOutput {
  const id = Read.input.parse(input)

  const result = model.read(id)

  return Read.output.parse(result)
}

export function update(input: UpdateInput): UpdateOutput {
  input = Update.input.parse(input)

  const result = model.update(input)

  return Update.output.parse(result)
}

export function obliterate(input: DeleteInput): DeleteOutput {
  const id = Delete.input.parse(input)

  const result = model.obliterate(id)

  return Delete.output.parse(result)
}
