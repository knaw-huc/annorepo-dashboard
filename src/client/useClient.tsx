import {AnnoRepoClient, createAnnorepoClient} from "../createAnnoRepoClient.ts";
import {orThrow} from "../util/orThrow.ts";

let client: AnnoRepoClient;

export function useClient() {
  if(!client) {
    const arHost = 'VITE_AR_HOST';
    const baseUrl = import.meta.env[arHost]
      ?? orThrow(`${arHost} not set`);
    console.log(`Create client with baseurl ${baseUrl}`)
    client = createAnnorepoClient({baseUrl})
  }
  return client
}