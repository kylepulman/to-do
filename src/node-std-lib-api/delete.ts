import http from 'node:http'

import * as Item from '@/node-std-lib-item-model'
import * as utility from './utilities'

export default function obliterate(request: http.IncomingMessage, response: http.ServerResponse) {
  const url = utility.getURL(request.url)
  const id = url.pathname.split('/')[1]

  const output = Item.controller.obliterate(id)

  response.end(JSON.stringify(output))
}
