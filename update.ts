import * as local from './update.schema'
import * as global from './schema'
import * as sql from './update.model'

export default function update(input: local.InputT) {
  const now = new Date().toISOString()

  const values = local.Values.parse([
    input.body,
    now,
    input.id,
  ])

  const row = sql.updateById.get(...values)

  const output = global.ListItem.parse(row)

  return output
}
