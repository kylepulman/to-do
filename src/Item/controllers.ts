import * as model from './models'
import * as schema from './schema'
import * as type from './types'

export function create(input: type.CreateInput): type.CreateOutput {
  const body = schema.Create.input.parse(input)

  const result = model.create(body)

  return schema.Create.output.parse(result)
}

export function read(input: type.ReadInput): type.ReadOutput {
  const id = schema.Read.input.parse(input)

  const result = model.read(id)

  return schema.Read.output.parse(result)
}

export function update(input: type.UpdateInput): type.UpdateOutput {
  input = schema.Update.input.parse(input)

  const result = model.update(input)

  return schema.Update.output.parse(result)
}

export function obliterate(input: type.DeleteInput): type.DeleteOutput {
  const id = schema.Delete.input.parse(input)

  const result = model.obliterate(id)

  return schema.Delete.output.parse(result)
}
