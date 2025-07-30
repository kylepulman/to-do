import create from './create'
import obliterate from './delete'
import read from './read'
import update from './update'

const [command, ...input] = process.argv.slice(2)

function fallback() {
  console.error('Please enter a valid command.')
}

switch (command) {
  case 'create': create(input)
    break
  case 'read': read(input)
    break
  case 'update': update(input)
    break
  case 'delete': obliterate(input)
    break
  default: fallback()
    break
}
