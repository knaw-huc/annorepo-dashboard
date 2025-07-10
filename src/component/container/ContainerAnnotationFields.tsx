import {H2} from "../common/H2.tsx";
import {Hint} from "../common/Hint.tsx";
import {useContainerFields} from "../../client/endpoint/useContainerFields.tsx";
import {Loading} from "../common/Loading.tsx";
import {isEmpty} from "lodash";
import {BadgeWithCount} from "../common/BadgeWithCount.tsx";

export function ContainerAnnotationFields(props: { name: string }) {
  const {name} = props;
  const {data: containerFields} = useContainerFields(name);

  if (!containerFields) {
    return <Loading/>;
  }

  if (isEmpty(containerFields)) {
    return null;
  }

  const fieldEntries = Object.entries(containerFields);

  return <div className="mt-5">
    <H2>Annotation fields <Hint>count</Hint></H2>

    {fieldEntries.sort(countDesc).map(([field, count], i) =>
      <BadgeWithCount key={i} count={count}>{field}</BadgeWithCount>
    )}
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

