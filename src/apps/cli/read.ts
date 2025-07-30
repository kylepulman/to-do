import * as client from '@/client'

export default async function read([id]: string[]) {
  const output = await client.read(id)

  console.log(output)
}
