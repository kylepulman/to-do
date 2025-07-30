import http from 'http'

import * as controller from './Item'
import * as type from './Item/types'

const BASE_URL = 'http://localhost:3000'
const PORT = 3000

const server = http.createServer((request, response) => {
  let output:
    | type.CreateOutput
    | type.ReadOutput

    | type.DeleteOutput

  let input:
    | type.CreateInput
    | type.ReadInput
    | type.UpdateInput

  let raw: Uint8Array[] = []
  let body = ''
  let updateInput: type.UpdateInput

  switch (request.method) {
    case 'POST':
      request
        .on('data', (chunk: Uint8Array) => {
          raw.push(chunk)
        })
        .on('end', () => {
          body = Buffer.concat(raw).toString()
          raw = []

          output = controller.create(body)

          response.end(JSON.stringify(output))
        })
      break
    case 'GET':
      if (request.url) input = new URL(`${BASE_URL}${request.url}`).searchParams.get('id') ?? undefined

      output = controller.read(input)

      response.end(JSON.stringify(output))
      break
    case 'PUT':

      request
        .on('data', (chunk: Uint8Array) => {
          raw.push(chunk)
        })
        .on('end', () => {
          if (!request.url) return response.end('No url.')

          input = request.url.trim().split('/')[1]
          body = Buffer.concat(raw).toString()
          raw = []

          updateInput = {
            id: input,
            body: (JSON.parse(body) as { body: string }).body,
          }

          output = controller.update(updateInput)

          response.end(JSON.stringify(output))
        })
      break
    case 'DELETE':
      if (request.url) input = request.url.trim().split('/')[1]

      output = controller.obliterate(input)

      response.end(String(output))
      break
    default:
      break
  }
})

server.listen(PORT)
