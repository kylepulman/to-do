import * as Item from '.'

export function create(body: Item.type.CreateInput) {
  const now = new Date().toISOString()

  const query = Item.schema.Create.query.parse([
    crypto.randomUUID(),
    now,
    now,
    body,
  ])

  return Item.schema
    .Create
    .result
    .parse(Item.sql.insert.get(...query))
}
