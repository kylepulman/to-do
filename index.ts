import dotenv from 'dotenv'
import pg, { type QueryResultRow } from 'pg'
import * as z from 'zod'

dotenv.config({ quiet: true })

const db = new pg.Pool({
  connectionString: process.env.POSTGRES_CONNECTION_STRING,
  allowExitOnIdle: true,
})

const ListItem = z.object({
  id: z.uuidv4(),
  created_at: z.date(),
  updated_at: z.date(),
  body: z.string(),
})

type ResultSchema = z.ZodObject<{
  command: z.ZodLiteral<'INSERT'> | z.ZodLiteral<'SELECT'> | z.ZodLiteral<'UPDATE'> | z.ZodLiteral<'DELETE'>
  rowCount: z.ZodLiteral<number> | z.ZodNumber
  rows: z.ZodTuple<z.ZodObject[]> | z.ZodArray<z.ZodObject> | z.ZodArray<z.ZodUnknown>
}>

const schema = {
  create: {
    Input: ListItem.pick({ body: true }),
    Query: ListItem,
    Result: z.object({
      command: z.literal('INSERT'),
      rowCount: z.literal(1),
      rows: z.tuple([ListItem.pick({ id: true })]),
    }) satisfies ResultSchema,
    Output: ListItem.pick({ id: true }),
  },
  read: {
    Input: ListItem.pick({ id: true }).partial(),
    Query: ListItem.pick({ id: true }).partial(),
    Result: z.object({
      command: z.literal('SELECT'),
      rowCount: z.number(),
      rows: z.array(ListItem),
    }) satisfies ResultSchema,
    Output: z.array(ListItem),
  },
  update: {
    Input: ListItem.pick({ id: true, body: true }),
    Query: ListItem.omit({ created_at: true }),
    Result: z.object({
      command: z.literal('UPDATE'),
      rowCount: z.literal(1),
      rows: z.tuple([ListItem.pick({ id: true, updated_at: true })]),
    }) satisfies ResultSchema,
    Output: ListItem.pick({ id: true, updated_at: true }),
  },
  delete: {
    Input: ListItem.pick({ id: true }),
    Query: ListItem.pick({ id: true }),
    Result: z.object({
      command: z.literal('DELETE'),
      rowCount: z.literal(1),
      rows: z.array(z.unknown()),
    }) satisfies ResultSchema,
    Output: z.number(),
  },
}

type Schema = {
  create: {
    Input: z.infer<typeof schema['create']['Input']>
    Query: z.infer<typeof schema['create']['Query']>
    Result: z.infer<typeof schema['create']['Result']>
    Output: z.infer<typeof schema['create']['Output']>
  }
  read: {
    Input: z.infer<typeof schema['read']['Input']>
    Query: z.infer<typeof schema['read']['Query']>
    Result: z.infer<typeof schema['read']['Result']>
    Output: z.infer<typeof schema['read']['Output']>
  }
  update: {
    Input: z.infer<typeof schema['update']['Input']>
    Query: z.infer<typeof schema['update']['Query']>
    Result: z.infer<typeof schema['update']['Result']>
    Output: z.infer<typeof schema['update']['Output']>
  }
  delete: {
    Input: z.infer<typeof schema['delete']['Input']>
    Query: z.infer<typeof schema['delete']['Query']>
    Result: z.infer<typeof schema['delete']['Result']>
    Output: z.infer<typeof schema['delete']['Output']>
  }
}

const model = {
  create: async (query: Schema['create']['Query']) => {
    const sql = `INSERT INTO to_do (id, created_at, updated_at, body) VALUES ($1, $2, $3, $4) RETURNING id`
    const values = [query.id, query.created_at, query.updated_at, query.body]

    const resultPromise = db.query(sql, values)

    const result = schema.create.Result.parse(await resultPromise)

    return result
  },
  read: async (query: Schema['read']['Query']) => {
    let sql = ''
    let values: string[] = []

    if (query.id) {
      sql = `SELECT id, created_at, updated_at, body FROM to_do WHERE id = $1`
      values = [query.id]
    }
    else {
      sql = `SELECT id, created_at, updated_at, body FROM to_do`
    }

    const resultPromise = db.query(sql, values)

    const result = schema.read.Result.parse(await resultPromise)

    return result
  },
  update: async (query: Schema['update']['Query']) => {
    const sql = `UPDATE to_do SET body = $1, updated_at = $2 WHERE id = $3 RETURNING id, updated_at`
    const values = [query.body, query.updated_at, query.id]

    const resultPromise = db.query(sql, values)

    const result = schema.update.Result.parse(await resultPromise)

    return result
  },
  delete: async (query: Schema['delete']['Query']) => {
    const sql = `DELETE FROM to_do WHERE id = $1`
    const values = [query.id]

    const resultPromise = db.query<QueryResultRow>(sql, values)

    const result = schema.delete.Result.parse(await resultPromise)

    return result
  },
}

const controller = {
  create: async (input: Schema['create']['Input']) => {
    input = schema.create.Input.parse(input)

    const now = new Date()
    const query = schema.create.Query.parse({
      id: crypto.randomUUID(),
      created_at: now,
      updated_at: now,
      body: input.body,
    })

    const result = await model.create(query)

    const output = schema.create.Output.parse(result.rows[0])

    console.log(output)
  },
  read: async (input: Schema['read']['Input']) => {
    input = schema.read.Input.parse(input)
    const query = schema.read.Query.parse(input)

    const result = await model.read(query)

    const output = schema.read.Output.parse(result.rows)

    console.log(output)
  },
  update: async (input: Schema['update']['Input']) => {
    input = schema.update.Input.parse(input)

    const now = new Date()
    const query = schema.update.Query.parse({
      id: input.id,
      body: input.body,
      updated_at: now,
    })

    const result = await model.update(query)

    const output = schema.update.Output.parse(result.rows[0])

    console.log(output)
  },
  delete: async (input: Schema['delete']['Input']) => {
    input = schema.delete.Input.parse(input)
    const query = schema.delete.Query.parse(input)

    const result = await model.delete(query)

    const output = schema.delete.Output.parse(result.rowCount)

    console.log(output)
  },
}

const [command, value, valueTwo] = process.argv.slice(2)

switch (command) {
  case 'create':
    void controller.create({
      body: value,
    })
    break
  case 'read':
    void controller.read({
      id: value,
    })
    break
  case 'update':
    void controller.update({
      id: value,
      body: valueTwo,
    })
    break
  case 'delete':
    void controller.delete({
      id: value,
    })
    break
  default:
    console.error('Please enter a valid command.')
    process.exit(1)
    break
}
