import {Button} from "../Button.tsx";
import {Add} from "../icon/Add.tsx";
import {Next} from "../icon/Next.tsx";
import {ReactNode} from "react";
import {SubQueryEditor} from "./SubQueryEditor.tsx";
import {useStore} from "../../../store/useStore.ts";
import {hasErrors} from "../../../store/query/util/hasErrors.ts";
import {
  useContainerFields
} from "../../../client/endpoint/useContainerFields.tsx";

export function QueryEditor(props: {
  containerName: string,
  onSubmit: () => void
  searchError?: Error | null,
  moreButtons?: ReactNode
  onAddSubQuery: () => void
}) {
  const {searchError, containerName, onAddSubQuery} = props;

  const {data: containerFields} = useContainerFields(containerName);
  const fieldNames = containerFields ? Object.keys(containerFields) : [];

  const {
    forms,
    errors,
  } = useStore();

  const handleSubmitQuery = () => {
    if (hasErrors(errors)) {
      return;
    }
    props.onSubmit()
  }

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

      <Button
        disabled={!!searchError || !forms.length || hasErrors(errors)}
        type="button"
        className="pl-5 h-full border-b-2"
        onClick={handleSubmitQuery}
      >
        Search
        <Next className="ml-1"/>
      </Button>
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
