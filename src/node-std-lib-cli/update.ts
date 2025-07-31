import * as client from '@/node-std-lib-fetch-client'

export default async function update([id, body]: string[]) {
  const output = await client.update({
    id,
    body,
  })

  console.log(output)
}
