import * as controller from './Item'
import * as type from './Item/types'

const [command, input] = process.argv.slice(2)

let output:
  | type.CreateOutput
  | type.ReadOutput

  | type.DeleteOutput

switch (command) {
  case 'create':
    output = controller.create(input)

    console.log('output', output)
    break
  case 'read':
    output = controller.read(input)

    console.log('output', output)
    break
  case 'update':
    output = controller.update(JSON.parse(input))

    console.log('output', output)
    break
  case 'delete':
    output = controller.obliterate(input)

    console.log('output', output)
    break
  default:
    break
}
