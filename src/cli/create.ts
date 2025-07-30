import * as Item from '@/Item'

export default function create([body]: string[]) {
  const output = Item.controller.create(body)

  console.log('output', output)
}
