import {Button} from "./Button.tsx";

export function PageNavigation(props: {
  prev?: string,
  current: number,
  next?: string,
  onChange: (page: string) => void
  className?: string
}) {
  let className = '';
  if (props.className) className += ` ${props.className}`;

  const {prev, next, onChange} = props;

  return <div className={className}>
    <Button disabled={!prev} onClick={() => onChange(prev!)} className="mr-2">Prev</Button>
    {props.current}
    <Button disabled={!next} onClick={() => onChange(next!)} className="ml-2">Next</Button>
  </div>
}