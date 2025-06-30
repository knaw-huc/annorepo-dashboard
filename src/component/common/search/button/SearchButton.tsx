import {Next} from "../../icon/Next.tsx";
import {Button} from "../../Button.tsx";

export function SearchButton(props: {
  onClick: () => void,
  disabled?: boolean
}) {
  return <Button
    disabled={props.disabled === true}
    type="button"
    className="h-full border-b-2"
    onClick={props.onClick}
  >
    Search
    <Next className="ml-1"/>
  </Button>
}