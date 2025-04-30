import {Button} from "../common/Button.tsx";

export function PageNavigation(props: {
  prev?: string,
  next?: string,
  onChange: (page: string) => void
}) {

  const {prev, next, onChange} = props;

  return <div>
   <span className="mr-2">
     <Button disabled={!prev} onClick={() => onChange(prev!)}>Prev</Button>
   </span>
    <Button disabled={!next} onClick={() => onChange(next!)}>Next</Button>
  </div>
}