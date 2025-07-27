import dotenv from 'dotenv'
import pg, { type QueryResultRow } from 'pg'
import * as z from 'zod'

dotenv.config({ quiet: true })

const ListItem = z.object({
  id: z.uuidv4(),
  createdAt: z.date(),
  updatedAt: z.date(),
  body: z.string(),
})
type ListItemT = z.infer<typeof ListItem>

const db = new pg.Pool({
  connectionString: process.env.POSTGRES_CONNECTION_STRING,
  allowExitOnIdle: true,
})

const CreateListItemInput = ListItem.pick({ body: true })
type CreateListItemInputT = z.infer<typeof CreateListItemInput>
const CreateListItemOutput = ListItem.pick({ id: true })
type CreateListItemOutputT = z.infer<typeof CreateListItemOutput>
async function createListItem(listItemInput: CreateListItemInputT) {
  listItemInput = CreateListItemInput.parse(listItemInput)

  const now = new Date()

  let listItem: ListItemT = {
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
    ...listItemInput,
  }

  listItem = ListItem.parse(listItem)

  const resultPromise = db.query<CreateListItemOutputT>(
    `INSERT INTO to_do (id, created_at, updated_at, body) VALUES ($1, $2, $3, $4) RETURNING id`,
    [listItem.id, listItem.createdAt, listItem.updatedAt, listItem.body],
  )

  const result = await resultPromise

  const output = CreateListItemOutput.parse(result.rows[0])

  console.log(output)
}

const ReadListItemInput = ListItem.pick({ id: true }).partial()
type ReadListItemInputT = z.infer<typeof ReadListItemInput>
const ReadListItemOutput = z.array(ListItem)
type ReadListItemOutputT = z.infer<typeof ReadListItemOutput>
async function readListItem(listItemInput: ReadListItemInputT) {
  listItemInput = ReadListItemInput.parse(listItemInput)

  const query: {
    sql: string
    values: string[]
  } = {
    sql: '',
    values: [],
  }

  if (listItemInput.id) {
    query.sql = `SELECT id, created_at "createdAt", updated_at "updatedAt", body FROM to_do WHERE id = $1`
    query.values = [listItemInput.id]
  }
  else {
    query.sql = `SELECT id, created_at "createdAt", updated_at "updatedAt", body FROM to_do`
  }

  const resultPromise = db.query<ReadListItemOutputT>(query.sql, query.values)

  const result = await resultPromise

  const output = ReadListItemOutput.parse(result.rows)

  console.log(output)
}

const UpdateListItemInput = ListItem.pick({ id: true, body: true })
type UpdateListItemInputT = z.infer<typeof UpdateListItemInput>
const UpdateListItemOutput = ListItem.pick({ id: true, updatedAt: true })
type UpdateListItemOutputT = z.infer<typeof UpdateListItemOutput>
async function updateListItem(listItemInput: UpdateListItemInputT) {
  listItemInput = UpdateListItemInput.parse(listItemInput)

  const now = new Date()

  let listItem: Omit<ListItemT, 'createdAt'> = {
    id: listItemInput.id,
    body: listItemInput.body,
    updatedAt: now,
  }

  listItem = ListItem.omit({ createdAt: true }).parse(listItem)

  const resultPromise = db.query<UpdateListItemOutputT>(
    `UPDATE to_do SET body = $1, updated_at = $2 WHERE id = $3 RETURNING id, updated_at "updatedAt"`,
    [listItem.body, listItem.updatedAt, listItem.id],
  )

  const result = await resultPromise

  const output = UpdateListItemOutput.parse(result.rows[0])

  console.log(output)
}

const DeleteListItemInput = ListItem.pick({ id: true })
type DeleteListItemInputT = z.infer<typeof DeleteListItemInput>
const DeleteListItemOutput = z.number()
async function deleteListItem(listItemInput: DeleteListItemInputT) {
  listItemInput = DeleteListItemInput.parse(listItemInput)

  const resultPromise = db.query<QueryResultRow>(
    `DELETE FROM to_do WHERE id = $1`,
    [listItemInput.id],
  )

  const result = await resultPromise

  const output = DeleteListItemOutput.parse(result.rowCount)

  console.log(output)
}

const [command, value, valueTwo] = process.argv.slice(2)

switch (command) {
  case 'create':
    void createListItem({
      body: value,
    })
    break
  case 'read':
    void readListItem({
      id: value,
    })
    break
  case 'update':
    void updateListItem({
      id: value,
      body: valueTwo,
    })
    break
  case 'delete':
    void deleteListItem({
      id: value,
    })
    break
  default:
    console.error('Please enter a valid command.')
    process.exit(1)
    break
}
