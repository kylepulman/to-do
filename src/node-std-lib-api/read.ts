import http from 'node:http'

import * as Item from '@/node-std-lib-item-model'
import * as utility from './utilities'

export default function read(request: http.IncomingMessage, response: http.ServerResponse) {
  const url = utility.getURL(request.url)

  const id = url.searchParams.get('id') ?? undefined

  const output = Item.controller.read(id)

  response.end(JSON.stringify(output))
}
