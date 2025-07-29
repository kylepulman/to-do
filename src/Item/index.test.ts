import test from 'node:test'

import * as database from '@/database'
import * as Item from '@/Item'

let id = ''

console.log('Clearing "to_do" table...')
database.db.exec(`DELETE FROM to_do`)

await test('A list item is created successfully.', (t: test.TestContext) => {
  const result = Item.create('walk the dog')
  console.log('create', result)

  t.assert.ok(Item.Create.result.safeParse(result).success, 'The created list item is returned.')

  id = result.id
})

await test('A list item is read by ID successfully.', (t: test.TestContext) => {
  const results = Item.read(id)
  console.log('read', results)

  t.assert.ok(Item.Read.result.safeParse(results).success, 'Zero or more list items are returned.')
  t.assert.strictEqual(results.length, 1, 'One list item is returned.')
  t.assert.strictEqual(results[0].id, id, 'The ID of the returned list item is equal to the provided ID.')
})

await test('A list item is updated by ID successfully.', (t: test.TestContext) => {
  const result = Item.update({
    id,
    body: 'take the dog for a walk',
  })
  console.log('update', result)

  t.assert.ok(Item.Update.result.safeParse(result).success, 'The updated list item is returned.')
  t.assert.ok(new Date(result.created_at).getTime() < new Date(result.updated_at).getTime(), 'The list item is updated more recently than its creation.')
})

await test('A list item is deleted by ID successfully.', (t: test.TestContext) => {
  const result = Item.obliterate(id)
  console.log('delete', result)

  t.assert.ok(Item.Delete.result.safeParse(result).success, 'One list item was deleted.')
})
