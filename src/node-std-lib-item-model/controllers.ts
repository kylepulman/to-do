import * as Item from '.'

export function create(input: unknown): Item.type.CreateOutput {
  const body = Item.schema.Create.input.parse(input)

  const result = Item.create(body)

  return Item.schema.Create.output.parse(result)
}

export function read(input: unknown): Item.type.ReadOutput {
  const id = Item.schema.Read.input.parse(input)

  const result = Item.read(id)

  return Item.schema.Read.output.parse(result)
}

export function update(input: unknown): Item.type.UpdateOutput {
  const update = Item.schema.Update.input.parse(input)

  const result = Item.update(update)

  return Item.schema.Update.output.parse(result)
}

export function obliterate(input: unknown): Item.type.DeleteOutput {
  const id = Item.schema.Delete.input.parse(input)

  const result = Item.obliterate(id)

  return Item.schema.Delete.output.parse(result)
}
