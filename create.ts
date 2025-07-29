import * as local from './create.schema'
import * as sql from './create.model'
import * as global from './schema'

export default function create(input: local.InputT) {
  const now = new Date().toISOString()

  const values = local.Values.parse([
    crypto.randomUUID(),
    now,
    now,
    input,
  ])

  const row = sql.insert.get(...values)

  const output = global.ListItem.parse(row)

  return output
}
