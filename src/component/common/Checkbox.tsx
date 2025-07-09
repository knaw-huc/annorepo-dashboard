import {Checked} from "./icon/Checked.tsx";
import {Unchecked} from "./icon/Unchecked.tsx";

export function Checkbox(props: {
  isSelected: boolean
  onToggle: () => void
  className?: string
}) {
  return <span className={props.className} onClick={props.onToggle}>
    {props.isSelected ? <Checked /> : <Unchecked/>}
  </span>
}