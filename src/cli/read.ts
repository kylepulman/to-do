import * as Item from '@/Item'

export default function read([id]: string[]) {
  const output = Item.controller.read(id)

  console.log('output', output)
}
