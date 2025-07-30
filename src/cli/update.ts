import * as Item from '@/Item'

export default function update([id, body]: string[]) {
  const output = Item.controller.update({
    id,
    body,
  })

  console.log('output', output)
}
