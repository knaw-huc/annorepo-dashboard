import { PropertyName } from "lodash";
import { CustomSubqueriesTemplateEditor } from "./CustomSubqueriesTemplateEditor.tsx";

export function CustomQueryTemplateEditor(props: {
  onParameterChange: (path: PropertyName[], isParam: boolean) => void;
}) {
  return (
    <CustomSubqueriesTemplateEditor
      path={[]}
      onParameterChange={props.onParameterChange}
    />
  );
}
