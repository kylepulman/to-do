import * as Item from '.'

export function obliterate(id: Item.type.DeleteInput) {
  const query = Item.schema.Delete.query.parse([
    id,
  ])

  return Item.schema
    .Delete
    .result
    .parse(Item.sql.deleteById.run(...query).changes)
}
