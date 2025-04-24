import {H1} from "./common/H1.tsx";

import {useGet} from "../client/useGet.tsx";
import {Loading} from "./index.ts";

export function AnnoRepoDetail() {
  const about = useGet('/about', {query: {refetchInterval: 1000}});

  return <div>
    <H1>Annotation repository</H1>
    <pre>
      {about.data
        ? JSON.stringify(about.data, null, 2)
        : <Loading/>
      }
    </pre>
  </div>
}