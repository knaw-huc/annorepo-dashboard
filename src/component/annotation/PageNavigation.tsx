import {Button} from "../common/Button.tsx";

export function PageNavigation(props: {
  prev?: string,
  next?: string,
  onChange: (page: string) => void
}) {

  const {prev, next, onChange} = props;

  return <div>
    <Button disabled={!prev} onClick={() => onChange(prev!)} className="mr-2">Prev</Button>
    <Button disabled={!next} onClick={() => onChange(next!)}>Next</Button>
  </div>
}