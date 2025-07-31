import create from './create'
import obliterate from './delete'
import read from './read'
import update from './update'

const [command, ...input] = process.argv.slice(2)

function fallback() {
  console.error('Please enter a valid command.')
}

switch (command) {
  case 'create': void create(input)
    break
  case 'read': void read(input)
    break
  case 'update': void update(input)
    break
  case 'delete': void obliterate(input)
    break
  default: fallback()
    break
}
