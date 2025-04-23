import {H1} from "../common/H1.tsx";
import {Hint} from "../common/Hint.tsx";
export type ContainerDetailProps = {
  id: string
}

export function ContainerDetail(props: ContainerDetailProps) {
  return <div>
    <H1>{props.id} <Hint>container</Hint></H1>
    <ul>
      <li>Annotation count: 0</li>
      <li>Last annotation created at {new Date().toLocaleDateString()}</li>
    </ul>
  </div>
}