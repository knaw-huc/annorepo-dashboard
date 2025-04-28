import {useGet} from "./useGet.tsx";
import {usePost} from "./usePost.tsx";
import {getUuid} from "../component/container/ContainerCard.tsx";
import {useEffect, useState} from "react";
import {ArQuery} from "./ArModel.ts";


export function useContainerSearch(
  containerId: URL,
  query: ArQuery
) {

  const postQuery = usePost('/services/{containerName}/search');
  const containerName = getUuid(containerId)
  const [searchId, setSearchId] = useState('')

  useEffect(() => {
    if(searchId) {
      return;
    }
    postQuery.mutateAsync({
        params: {
          path: {containerName: getUuid(containerId)}
        },
        body: query as unknown as string,
      }
    ).then(({response}) => {
      setSearchId(getUuid(new URL(response.headers.get('Location')!)))
    })
  }, [searchId]);

  return useGet('/services/{containerName}/search/{searchId}',
    {
      params: {
        path: {
          containerName: containerName,
          searchId: searchId
        }
      },
      query: {enabled: !!searchId}
    })
}

