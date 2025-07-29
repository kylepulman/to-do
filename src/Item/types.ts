import * as zod from 'zod'
import * as schema from './schema'

export type CreateInput = zod.infer<typeof schema.Create.input>
export type CreateQuery = zod.infer<typeof schema.Create.query>
export type CreateResult = zod.infer<typeof schema.Create.result>
export type CreateOutput = zod.infer<typeof schema.Create.output>

export type ReadInput = zod.infer<typeof schema.Read.input>
export type ReadQuery = zod.infer<typeof schema.Read.query>
export type ReadResult = zod.infer<typeof schema.Read.result>
export type ReadOutput = zod.infer<typeof schema.Read.output>

export type UpdateInput = zod.infer<typeof schema.Update.input>
export type UpdateQuery = zod.infer<typeof schema.Update.query>
export type UpdateResult = zod.infer<typeof schema.Update.result>
export type UpdateOutput = zod.infer<typeof schema.Update.output>

export type DeleteInput = zod.infer<typeof schema.Delete.input>
export type DeleteQuery = zod.infer<typeof schema.Delete.query>
export type DeleteResult = zod.infer<typeof schema.Delete.result>
export type DeleteOutput = zod.infer<typeof schema.Delete.output>
