import {Button} from "../../Button.tsx";
import {Add} from "../../icon/Add.tsx";

export function AddSubQueryButton(props: {
  onClick: () => void
  disabled?: boolean
}) {
  return <Button
    type="button"
    className="pl-3 h-full border-b-2 mr-2"
    onClick={props.onClick}
    secondary
    disabled={props.disabled}
  >
    <Add className="mr-2"/>
    Add subquery
  </Button>
}