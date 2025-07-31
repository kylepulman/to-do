import * as client from '@/node-std-lib-fetch-client'

export default async function obliterate([id]: string[]) {
  const output = await client.obliterate(id)

  console.log(output)
}
