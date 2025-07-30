import test from 'node:test'

import * as Item from '@/Item'
import * as database from '@/database'

const BASE_URL = 'http://localhost:3000'

let id = ''

console.log('Clearing "to_do" table...')
database.db.exec(`DELETE FROM to_do`)

await test('A list item is created.', async (t: test.TestContext) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    body: JSON.stringify({
      body: 'walk the dog',
    }),
  })

  const data = await response.json() as Item.type.CreateOutput
  console.log('create', data)

  t.assert.ok(Item.schema.Create.output.safeParse(data).success, 'The created list item is returned.')

  id = data.id
})

await test('Zero or more list items are read.', async (t: test.TestContext) => {
  const response = await fetch(`${BASE_URL}?id=${id}`, {
    method: 'GET',
  })

  const data = await response.json()
  console.log('read', data)

  t.assert.ok(Item.schema.Read.output.safeParse(data).success, 'Zero or more list items are returned.')
})

await test('A list item is updated.', async (t: test.TestContext) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      body: 'walk the pup',
    }),
  })

  const data = await response.json() as Item.type.UpdateOutput
  console.log('update', data)

  t.assert.ok(Item.schema.Update.output.safeParse(data).success, 'The updated list item is returned.')
  t.assert.ok(new Date(data.created_at).getTime() < new Date(data.updated_at).getTime(), 'The list item is updated more recently than its creation.')
})

await test('A list item is deleted.', async (t: test.TestContext) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  })

  const data = await response.json() as Item.type.DeleteOutput
  console.log('delete', data)

  t.assert.ok(Item.schema.Delete.output.safeParse(data).success, 'The number 1 is returned to indicate the number of deleted items.')
})
