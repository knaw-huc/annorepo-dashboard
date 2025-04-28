import {PropsWithChildren, useEffect} from "react";
import {ArContainer} from "../../client/ArModel.ts";
import {Loading} from "../common/Loading.tsx";
import {Card} from "../common/Card.tsx";
import {A} from "../common/A.tsx";
import {External} from "../common/icon/External.tsx";
import {Pipe} from "../common/Pipe.tsx";
import {Link} from "@tanstack/react-router";
import {
  getSearchById,
} from "../../client/useSearchContainer.tsx";
import {useOpenApiClient} from "../../client/OpenApiClientProvider.tsx";
import {useQuery} from "@tanstack/react-query";

export function getUuid(idUrl: URL): string {
  const id = idUrl.toString().split('/').filter(part => !!part).pop();
  if (!id) {
    throw new Error(`No ID found in ${idUrl}`)
  }
  return id
}


export function ContainerCard(props: PropsWithChildren<{
  container: ArContainer
}>) {
  const {container} = props;
  const query = {"body.purpose": "identifying"};
  // const queryResult = useSearchContainer(getUuid(new URL(container.id)), query)

  const client = useOpenApiClient();
  const containerName = getUuid(new URL(container.id))

  const queryContainerSearchFn = async () => {
    return client.POST(
      "/services/{containerName}/search",
      {
        body: query as unknown as string,
        params: {path: {containerName}}
      }
    ).then(({response}) => {
      const data = getUuid(new URL(response.headers.get('Location')!));
      console.log('post finished', {data})
      return data
    });
  };

  const queryKey = [containerName, query];

  const qr = useQuery({
    queryKey: queryKey,
    queryFn: queryContainerSearchFn,
  });

  useEffect(() => {
    console.log('qr', qr.status, qr.fetchStatus, qr.data)
  }, [qr.data, qr.status, qr.fetchStatus]);

  const qrqr = useQuery({
    queryKey: [...queryKey, qr.data],
    queryFn: async () => getSearchById(client, containerName, qr.data!),
    enabled: !!qr.data,
  })

  useEffect(() => {
    console.log('useEffect qrs', {qr: qr.data, qrqr: qrqr.data})
  }, [qr.data, qrqr.data]);

  if (!qrqr.data) {
    return <Loading/>;
  }

  return <Card
    header={
      <Link
        to="/container/$containerId"
        params={{containerId: container.id}}
      ><h5
        className="mt-2 text-xl font-medium leading-tight text-center"
      >
        {container.label || ''}
      </h5></Link>
    }
    footer={
      <div className="text-right">
        <A href={container.id}>
          Source
          <External/>
        </A>
        <Pipe/>
        <A href={container.first.id}>
          Browse annotations
          <External/>
        </A>
      </div>
    }
  >
    <div>
      <p className="mb-2">
        {container.total} annotations
      </p>
      <div className="mb-2">
        Last edit:
        <pre>{JSON.stringify(qrqr.data, null, 2)}</pre>
        <pre>{JSON.stringify(qr.data, null, 2)}</pre>
      </div>
      <p>
        Type: {container.type.join(', ')}
      </p>
    </div>
  </Card>
}