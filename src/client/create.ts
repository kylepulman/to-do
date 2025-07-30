import * as global from '@/globals'
import * as Item from '@/Item'

export async function create(body: Item.type.CreateInput) {
  console.log('body', body)

  const response = await fetch(global.BASE_URL, {
    method: 'POST',
    body: JSON.stringify({
      body: body,
    }),
  })

  const data = await response.json() as Item.type.CreateOutput

  return data
}
