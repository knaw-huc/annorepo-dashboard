import { useOpenApiClient } from "../OpenApiClientProvider.tsx";
import { createQueryKey } from "../query/useGet.tsx";
import { useQuery } from "@tanstack/react-query";
import { QR } from "../query/QR.tsx";
import { GetPath } from "../query/GetPath.tsx";
import { orThrow } from "../../util/orThrow.ts";
import { ArUser } from "../../model/ArModel.ts";

export function useContainerUsers(name: string): QR<ArUser[]> {
  const client = useOpenApiClient();
  const path: GetPath = "/services/{containerName}/users";
  const params = { params: { path: { containerName: name } } };
  return useQuery({
    queryKey: createQueryKey(path, params),
    queryFn: async () =>
      await client
        .GET(path, params)
        .then(({ data }) => data ?? orThrow("No container response")),
  });
}
