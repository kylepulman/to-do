import * as client from '@/client'

export default async function create([body]: string[]) {
  const output = await client.create(body)

  console.log(output)
}
