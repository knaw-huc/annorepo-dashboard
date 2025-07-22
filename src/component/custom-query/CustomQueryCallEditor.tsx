import {CustomSubQueryEditor} from "../common/search/CustomSubQueryEditor.tsx";
import {useStore} from "../../store/useStore.ts";

export function CustomQueryCallEditor(props: {
  containerName?: string
}) {

  const {containerName} = props;

  const {subqueries} = useStore()

  return <div>
    {subqueries.map((_, i) => <CustomSubQueryEditor
      containerName={containerName}
      key={i}
      subqueryIndex={i}
      isCall={true}
    />)}
  </div>
}

