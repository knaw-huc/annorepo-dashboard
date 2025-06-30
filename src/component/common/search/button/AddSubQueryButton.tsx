import {Button} from "../../Button.tsx";
import {Add} from "../../icon/Add.tsx";

export function AddSubQueryButton(props: {
  onClick: () => void
  disabled?: boolean
}) {
  return <Button
    type="button"
    className="h-full border-b-2"
    onClick={props.onClick}
    secondary
    disabled={props.disabled}
  >
    <Add className="mr-2"/>
    Add subquery
  </Button>
}