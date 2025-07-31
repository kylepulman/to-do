import * as global from '@/globals'
import * as Item from '@/node-std-lib-item-model'

export async function read(id: Item.type.ReadInput) {
  const response = await fetch(`${global.BASE_URL}${id ? `?id=${id}` : ''}`, {
    method: 'GET',
  })

  const data = await response.json() as Item.type.UpdateOutput

  return data
}
