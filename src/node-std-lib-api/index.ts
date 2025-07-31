import http from 'http'
import create from './create'
import obliterate from './delete'
import read from './read'
import update from './update'

const PORT = 3000
const LISTENING = `[SERVER] Listening on port %d...`

const server = http.createServer((request, response) => {
  if (!request.url || !request.method) {
    response.statusCode = 400
    response.end('Bad Request')
    return
  }

  console.log(`${request.method}${' '.repeat(6 - request.method.length)} ${request.url}`)

  function fallback(_request: http.IncomingMessage, response: http.ServerResponse) {
    response.statusCode = 404
    response.end('Not Found')
  }

  switch (request.method) {
    case 'POST': void create(request, response)
      break
    case 'GET': read(request, response)
      break
    case 'PUT': void update(request, response)
      break
    case 'DELETE': obliterate(request, response)
      break
    default: fallback(request, response)
      break
  }
})

server.listen(PORT)

server.on('listening', () => {
  console.log(LISTENING, PORT)
})

server.on('error', (error) => {
  if ('code' in error && error.code === 'EADDRINUSE') {
    console.log(LISTENING, PORT)
    process.exit(0)
  }
  else {
    console.error('[SERVER]', error)
  }
})
