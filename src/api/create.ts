import http from 'node:http'

import * as Item from '@/Item'
import * as utility from './utilities'

export default async function create(request: http.IncomingMessage, response: http.ServerResponse) {
  const body = await utility
    .getBody(request)
    .then(body => JSON.parse(body) as Record<'body', unknown>)

  const output = Item.controller.create(body.body)

  response.end(JSON.stringify(output))
}
