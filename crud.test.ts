import db from './database'
import test from 'node:test'
import create from './create'
import obliterate from './delete'
import read from './read'
import update from './update'

import * as deleteSchema from './delete.schema'
import * as global from './schema'

let id = ''

console.log('Clearing "to_do" table...')
db.exec(`DELETE FROM to_do`)

await test('A list item is created successfully.', (t: test.TestContext) => {
  const output = create('walk the dog')
  console.log('create', output)

  t.assert.ok(global.ListItem.safeParse(output).success, 'The created list item is returned.')

  id = output.id
})

await test('A list item is read by ID successfully.', (t: test.TestContext) => {
  const output = read(id)
  console.log('read', output)

  t.assert.ok(global.ListItems.safeParse(output).success, 'All list items are returned.')
  t.assert.strictEqual(output.length, 1, 'A single list item is returned.')
  t.assert.strictEqual(output[0].id, id, 'The ID of the returned list item is equal to the provided ID.')
})

await test('A list item is updated by ID successfully.', (t: test.TestContext) => {
  const output = update({
    id,
    body: 'take the dog for a walk',
  })
  console.log('update', output)

  t.assert.ok(global.ListItem.safeParse(output).success, 'The updated list item is returned.')
  t.assert.ok(new Date(output.created_at).getTime() < new Date(output.updated_at).getTime(), 'The list item is updated more recently than its creation.')
})

await test('A list item is deleted by ID successfully.', (t: test.TestContext) => {
  const output = obliterate(id)
  console.log('delete', output)

  t.assert.ok(deleteSchema.Output.safeParse(output).success, 'One list item was deleted.')
})
