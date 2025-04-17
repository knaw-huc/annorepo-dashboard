import openapiTS, {astToString} from "openapi-typescript";
import * as fs from 'fs';

const openApiEndpoint = process.env.OPEN_API_ENDPOINT
  || 'http://localhost:8080/openapi.json'
const schemaFilename = process.env.RESULT_TYPES_PATH
  || "../../src/openapi.ts";

main()

async function main() {
  console.log('Create client');
  const openApiUrl = new URL(openApiEndpoint);
  const openApiFilename = openApiUrl.pathname.split('/').pop()
  const openApiJson = await fetch(openApiUrl)
    .catch(e => {
      const cause = e instanceof Error ? e.message : 'unknown';
      throw new Error(`Could not fetch ${openApiEndpoint}, cause: ${cause}`);
    })
    .then(r => r.json())

  const ast = await openapiTS(openApiJson)
  const contents = astToString(ast);
  fs.writeFileSync(openApiFilename!, JSON.stringify(openApiJson));
  fs.writeFileSync(schemaFilename, contents);
}