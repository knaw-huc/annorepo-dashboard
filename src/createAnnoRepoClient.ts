import createClient from 'openapi-fetch'
import type { paths } from './openapi.ts'

export function createAnnorepoClient(config: {baseUrl: string}) {
  return createClient<paths>(config)
}

export type AnnoRepoClient = ReturnType<typeof createAnnorepoClient>
