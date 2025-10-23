import { useStore } from "../../store/useStore.ts";
import { Unchecked } from "../common/icon/Unchecked.tsx";
import { ArAnnotation } from "../../model/ArModel.ts";
import { SemiChecked } from "../common/icon/SemiChecked.tsx";
import { Checked } from "../common/icon/Checked.tsx";

export function SelectionStatus(props: { items?: ArAnnotation[] }) {
  const { items } = props;
  const { selectedAnnotationIds, setSelectedAnnotationsState } = useStore();

  function handleToggleSelect(items: ArAnnotation[], allSelected: boolean) {
    const update = allSelected ? [] : items.map((i) => i.id);
    setSelectedAnnotationsState({
      selectedAnnotationIds: update,
    });
  }

  if (!items) {
    return null;
  }
  const noneSelected = selectedAnnotationIds.length === 0;
  const someSelected =
    !noneSelected && selectedAnnotationIds.length < items.length;
  const allSelected =
    !noneSelected && selectedAnnotationIds.length === items.length;

  return (
    <span
      className="text-neutral-600 cursor-pointer"
      onClick={() => handleToggleSelect(items, allSelected)}
    >
      {noneSelected && (
        <span title="Select all">
          <Unchecked size={20} />
        </span>
      )}
      {someSelected && (
        <span title="Select all">
          <SemiChecked size={20} />
        </span>
      )}
      {allSelected && (
        <span title="Deselect all">
          <Checked size={20} />
        </span>
      )}
    </span>
  );
}
