import { useStore } from "../../store/useStore.ts";
import { ArAnnotation } from "../../model/ArModel.ts";
import { Checkbox, CheckboxValue } from "../common/Checkbox.tsx";

export function SelectionStatus(props: { annotations?: ArAnnotation[] }) {
  const { annotations } = props;
  const { selectedAnnotationIds, setSelectedAnnotationsState } = useStore();
  const selectedCount = selectedAnnotationIds.length;

  function handleToggleSelect(annotations: ArAnnotation[]) {
    const allSelected = selectedCount === annotations.length;
    const update = allSelected ? [] : annotations.map((i) => i.id);
    setSelectedAnnotationsState({ selectedAnnotationIds: update });
  }

  let checkboxValue: CheckboxValue = "unchecked";
  let checkboxTitle = "";
  if (annotations) {
    const noneSelected = selectedCount === 0;
    const allSelected = selectedCount === annotations.length;
    const someSelected = !noneSelected && selectedCount < annotations.length;
    if (allSelected) {
      checkboxValue = "checked";
    } else if (someSelected) {
      checkboxValue = "indeterminate";
    }
    checkboxTitle = allSelected ? "Deselect all" : "Select all";
  }

  if (!annotations) {
    return null;
  }

  return (
    <Checkbox
      value={checkboxValue}
      title={checkboxTitle}
      onClick={() => handleToggleSelect(annotations)}
    />
  );
}
