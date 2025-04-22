import {H1} from "./common/H1.tsx";

import {useGet} from "../client/useGet.ts";

export function Home() {
  const about = useGet('/about', {query: {refetchInterval: 1000}});

  return <div>
    <H1>Home</H1>
    <pre>
      {about.data ? JSON.stringify(about.data, null, 2) : null}
    </pre>
    <ul>
      <li>Container1</li>
      <li>Container2</li>
    </ul>
  </div>
}