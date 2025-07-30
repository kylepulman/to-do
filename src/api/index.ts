import http from 'http'
import create from './create'
import obliterate from './delete'
import read from './read'
import update from './update'

const PORT = 3000

function fallback(_request: http.IncomingMessage, response: http.ServerResponse) {
  response.statusCode = 404
  response.end('Not Found')
}

const server = http.createServer((request, response) => {
  if (!request.url) {
    response.statusCode = 400
    response.end('Bad Request')
    return
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

server.listen(PORT, () => {
  console.log(`Listening on port %d...`, PORT)
})
