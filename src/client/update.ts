import * as global from '@/globals'
import * as Item from '@/Item'

export async function update(updateInput: Item.type.UpdateInput) {
  const response = await fetch(`${global.BASE_URL}/${updateInput.id}`, {
    method: 'PUT',
    body: JSON.stringify({
      body: updateInput.body,
    }),
  })

  const data = await response.json() as Item.type.UpdateOutput

  return data
}
