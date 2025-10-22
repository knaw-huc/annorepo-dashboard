import { useContainerFields } from "../../client/endpoint/useContainerFields.tsx";
import { Loading } from "../common/Loading.tsx";

export function ContainerAnnotationFields(props: { name: string }) {
  const { name } = props;
  const { data: containerFields } = useContainerFields(name);

  if (!containerFields) {
    return <Loading name="container fields" />;
  }

  const fieldEntries = Object.entries(containerFields);

  return (
    <div className="flex flex-col p-8 bg-stone-50 grow">
      <h2 className="text-xl mt-4 mb-4">Annotation fields</h2>
      {fieldEntries.sort(countDesc).map(([field, count], i) => (
        <div
          key={i}
          className="flex justify-between items-center max-w-72 mb-2"
        >
          <div>
            <div className="rounded bg-anrep-blue-200/50 inline-block p-1 text-xs text-anrep-blue-800 font-mono">
              {field}
            </div>
          </div>
          <div className="text-sm">{count}</div>
        </div>
      ))}
    </div>
  );
}

function countDesc(a: [string, number], b: [string, number]) {
  if (a[1] > b[1]) {
    return -1;
  } else if (a[1] < b[1]) {
    return 1;
  } else {
    return 0;
  }
}
