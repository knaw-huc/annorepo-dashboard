import {useStore} from "../../store/useStore.ts";
import {Button} from "../common/Button.tsx";
import {Unchecked} from "../common/icon/Unchecked.tsx";
import {ArAnnotation} from "../../model/ArModel.ts";
import {SemiChecked} from "../common/icon/SemiChecked.tsx";
import {Checked} from "../common/icon/Checked.tsx";

export function SelectionStatus(props: {
  items?: ArAnnotation[]
}) {
  const {items} = props;
  const {selectedAnnotationIds, setSelectedAnnotationsState} = useStore()

  function handleToggleSelect(
    items: ArAnnotation[],
    allSelected: boolean
  ) {
    const update = allSelected ? [] : items.map(i => i.id);
    setSelectedAnnotationsState({
      selectedAnnotationIds: update
    })
  }

  if (!items) {
    return null
  }
  const noneSelected = selectedAnnotationIds.length === 0;
  const someSelected = !noneSelected && selectedAnnotationIds.length < items.length;
  const allSelected = !noneSelected && selectedAnnotationIds.length === items.length;

  return <Button
    secondary
    className="ml-2"
    onClick={() => handleToggleSelect(items, allSelected)}
  >
    {noneSelected && <Unchecked/>}
    {someSelected && <SemiChecked/>}
    {allSelected && <Checked/>}
  </Button>
}