import {H1} from "../common/H1.tsx";

import {useGet} from "../../client/useGet.ts";

export function ContainerGallery() {
  const about = useGet('/about', {query: {refetchInterval: 1000}});

  return <div>
    <H1>Containers</H1>
    <pre>
      {about.data ? JSON.stringify(about.data, null, 2) : null}
    </pre>
  </div>
}