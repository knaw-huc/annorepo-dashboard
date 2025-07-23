import { CustomSubqueryEditor } from "../common/search/CustomSubqueryEditor.tsx";
import { useStore } from "../../store/useStore.ts";

export function CustomQueryCallEditor(props: { containerName?: string }) {
  const { containerName } = props;

  const { subqueries } = useStore();

  return (
    <div>
      {subqueries.map((_, i) => (
        <CustomSubqueryEditor
          containerName={containerName}
          key={i}
          path={[i]}
          isCall={true}
        />
      ))}
    </div>
  );
}
