import {H2} from "../common/H2.tsx";
import {Hint} from "../common/Hint.tsx";
import {ListGroup, ListItem} from "../common/ListGroup.tsx";
import {Badge} from "../common/Badge.tsx";
import {useContainerFields} from "../../client/endpoint/useContainerFields.tsx";

export function ContainerAnnotationFields(props: { name: string }) {
  const {name} = props;
  const {data: containerFields} = useContainerFields(name);

  if (!containerFields?.length) {
    return null;
  }
  const fieldEntries = Object.entries(containerFields);

  return <div className="mt-5">
    <H2>Annotation fields <Hint>by usage</Hint></H2>
    <ListGroup>
      {fieldEntries.sort(countDesc).map(([field, count], i) => {
        return <ListItem
          key={field}
          isLast={i >= fieldEntries.length - 1}
        >
          {field} <span
          className="inline-block float-right"><Badge>{count}</Badge></span>
        </ListItem>
      })}
    </ListGroup>
  </div>
}

function countDesc(
  a: [string, number],
  b: [string, number]
) {
  if (a[1] > b[1]) {
    return -1;
  } else if (a[1] < b[1]) {
    return 1;
  } else {
    return 0;
  }
}