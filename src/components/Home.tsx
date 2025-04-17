import {H1} from "./common/H1.tsx";
import {useClient} from "./useClient.tsx";
import {useEffect, useState} from "react";

export function Home() {
  const client = useClient()
  const [about, setAbout] = useState()

  useEffect(() => {
    init()
    async function init() {
      const {data} = await client.GET('/about')
      setAbout(data)
    }
  }, []);

  return <div>
    <H1>Home</H1>
    <pre>
      {JSON.stringify(about, null, 2)}
    </pre>
    <ul>
      <li>Container1</li>
      <li>Container2</li>
    </ul>
  </div>
}