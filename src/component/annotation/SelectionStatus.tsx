import { useStore } from "../../store/useStore.ts";
import { ArAnnotation } from "../../model/ArModel.ts";
import { useRef } from "react";

export function SelectionStatus(props: { annotations?: ArAnnotation[] }) {
  const { annotations } = props;
  const { selectedAnnotationIds, setSelectedAnnotationsState } = useStore();
  const selectedCount = selectedAnnotationIds.length;

  function handleToggleSelect(annotations: ArAnnotation[]) {
    const allSelected = selectedCount === annotations.length;
    const update = allSelected ? [] : annotations.map((i) => i.id);
    setSelectedAnnotationsState({ selectedAnnotationIds: update });
  }

  const checkboxRef = useRef<HTMLInputElement>(null);
  let checkboxTitle = "";
  if (checkboxRef.current && annotations) {
    const noneSelected = selectedCount === 0;
    const allSelected = selectedCount === annotations.length;
    const someSelected = !noneSelected && selectedCount < annotations.length;
    checkboxRef.current.checked = allSelected;
    checkboxRef.current.indeterminate = someSelected;
    checkboxTitle = allSelected ? "Deselect all" : "Select all";
  }

  if (!annotations) {
    return null;
  }

  return (
    <span
      className="text-neutral-600 cursor-pointer"
      onClick={() => handleToggleSelect(annotations)}
    >
      <span title={checkboxTitle}>
        <input type="checkbox" ref={checkboxRef} />
      </span>
    </span>
  );
}
