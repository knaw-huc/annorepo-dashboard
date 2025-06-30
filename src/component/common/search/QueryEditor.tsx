import {Button} from "../Button.tsx";
import {Add} from "../icon/Add.tsx";
import {ReactNode} from "react";
import {SubQueryEditor} from "./SubQueryEditor.tsx";
import {useStore} from "../../../store/useStore.ts";
import {
  useContainerFields
} from "../../../client/endpoint/useContainerFields.tsx";

export function QueryEditor(props: {
  containerName: string,
  moreButtons?: ReactNode
  onAddSubQuery: () => void
}) {
  const {containerName, onAddSubQuery} = props;

  const {data: containerFields} = useContainerFields(containerName);
  const fieldNames = containerFields ? Object.keys(containerFields) : [];

  const {forms} = useStore();

  return <div>
    <div className="mb-2">
      <Button
        type="button"
        className="pl-3 h-full border-b-2 mr-2"
        onClick={onAddSubQuery}
        secondary
      >
        <Add className="mr-2"/>
        Add subquery
      </Button>

      {props.moreButtons}


    </div>
    {forms.map((_, i) => {
      return <SubQueryEditor
        key={i}
        containerName={containerName}
        fieldNames={fieldNames}
        formIndex={i}
      />;
    })}
  </div>
}
