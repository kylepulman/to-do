import * as global from '@/globals'
import * as Item from '@/node-std-lib-item-model'

export async function obliterate(id: Item.type.DeleteInput) {
  const response = await fetch(`${global.BASE_URL}/${id}`, {
    method: 'DELETE',
  })

  const data = await response.json() as Item.type.DeleteOutput

  return data
}
