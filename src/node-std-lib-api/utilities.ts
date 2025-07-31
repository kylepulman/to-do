import http from 'node:http'

export function getURL(url: http.IncomingMessage['url']) {
  return new URL(`http://${process.env.HOST ?? 'localhost'}${url ?? ''}`)
}

export function getBody(request: http.IncomingMessage) {
  return new Promise<string>((resolve) => {
    const raw: Uint8Array[] = []

    request
      .on('data', (chunk: Uint8Array) => {
        raw.push(chunk)
      })
      .on('end', () => {
        const body = Buffer.concat(raw).toString()

        resolve(body)
      })
  })
}
