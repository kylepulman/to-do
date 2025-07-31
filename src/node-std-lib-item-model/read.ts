import * as Item from '.'

export function read(id: Item.type.ReadInput) {
  const query = Item.schema.Read.query.parse([
    id,
  ])

  return Item.schema.Read.result.parse(
    query[0]
      ? Item.sql.selectById.all(...query)
      : Item.sql.selectAll.all(),
  )
}
