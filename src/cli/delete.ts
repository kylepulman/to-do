import * as Item from '@/Item'

export default function obliterate([id]: string[]) {
  const output = Item.controller.obliterate(id)

  console.log('output', output)
}
