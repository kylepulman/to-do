import * as Item from '.'

export function update(input: Item.type.UpdateInput) {
  const query = Item.schema.Update.query.parse([
    input.body,
    new Date().toISOString(),
    input.id,
  ])

  return Item.schema
    .Update
    .result
    .parse(Item.sql.updateById.get(...query))
}
