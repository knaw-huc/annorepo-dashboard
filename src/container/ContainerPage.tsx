import {H1} from "../common/H1.tsx";

export function ContainerPage() {
  return <div>
    <H1>Container X</H1>
    <ul>
      <li>Annotation count: Y</li>
      <li>Last annotation created at {new Date().toLocaleDateString()}</li>
    </ul>
  </div>
}