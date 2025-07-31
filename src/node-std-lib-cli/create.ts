import * as client from '@/node-std-lib-fetch-client'

export default async function create([body]: string[]) {
  const output = await client.create(body)

  console.log(output)
}
