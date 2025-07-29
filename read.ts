import * as sql from './read.model'
import * as local from './read.schema'
import * as global from './schema'

export default function read(input?: local.InputT) {
  const id = local.Input.parse(input)

  const rows = id
    ? sql.selectById.all(id)
    : sql.selectAll.all()

  const output = global.ListItems.parse(rows)

  return output
}
