import * as sql from './delete.model'
import * as local from './delete.schema'

export default function obliterate(input: local.InputT) {
  const id = local.Input.parse(input)

  const result = sql.deleteById.run(id)

  const output = local.Output.parse(result.changes)

  return output
}
