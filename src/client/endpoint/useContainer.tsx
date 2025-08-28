import { useOpenApiClient } from "../OpenApiClientProvider.tsx";
import { AnnoRepoOpenApiClient } from "../OpenApiClient.tsx";
import { createQueryKey } from "../query/useGet.tsx";
import { useQuery } from "@tanstack/react-query";
import { ArContainer, ArContainerWithETag } from "../../model/ArModel.ts";
import { QR } from "../query/QR.tsx";
import { GetPath } from "../query/GetPath.tsx";
import { orThrow } from "../../util/orThrow.ts";

export function useContainer(name: string): QR<ArContainerWithETag> {
  const client = useOpenApiClient();
  return useQuery(getContainer(client, name));
}

export function getContainerQuery(containerName: string) {
  const path: GetPath = "/w3c/{containerName}";
  const params = { params: { path: { containerName } } };
  const key = createQueryKey(path, params);
  return { path, params, key };
}

export function getContainer(client: AnnoRepoOpenApiClient, name: string) {
  const { path, params, key } = getContainerQuery(name);
  return {
    queryKey: key,
    queryFn: async () =>
      await client.GET(path, params).then(({ data, response }) => {
        if (!data) {
          throw new Error(`No container response for ${name}`);
        }
        return {
          ...(data as ArContainer),
          ETag:
            (response as Response).headers.get("ETag") ??
            orThrow("No ETag response"),
        };
      }),
  };
}
