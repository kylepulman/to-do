import http from 'node:http'

import * as Item from '@/Item'
import * as utility from './utilities'

export default async function update(request: http.IncomingMessage, response: http.ServerResponse) {
  const url = utility.getURL(request.url)
  const id = url.pathname.split('/')[1]

  const body = await utility
    .getBody(request)
    .then(body => JSON.parse(body) as Record<'body', unknown>)

  const output = Item.controller.update({
    id,
    body: body.body,
  })

  response.end(JSON.stringify(output))
}
