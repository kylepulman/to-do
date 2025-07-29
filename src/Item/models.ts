import * as schema from './schema'
import * as sql from './sql'
import * as type from './types'

export function create(body: type.CreateInput) {
  const now = new Date().toISOString()

  const query = schema.Create.query.parse([
    crypto.randomUUID(),
    now,
    now,
    body,
  ])

  return schema.Create.result.parse(sql.insert.get(...query))
}

export function read(id: type.ReadInput) {
  const query = schema.Read.query.parse([
    id,
  ])

  return schema.Read.result.parse(
    query[0]
      ? sql.selectById.all(...query)
      : sql.selectAll.all(),
  )
}

export function update(input: type.UpdateInput) {
  console.log('input', input)

  const query = schema.Update.query.parse([
    input.body,
    new Date().toISOString(),
    input.id,
  ])

  console.log('query', query)

  return schema.Update.result.parse(sql.updateById.get(...query))
}

export function obliterate(id: type.DeleteInput) {
  const query = schema.Delete.query.parse([
    id,
  ])

  return schema.Delete.result.parse(sql.deleteById.run(...query).changes)
}
