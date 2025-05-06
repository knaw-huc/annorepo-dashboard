import {Button} from "./Button.tsx";
import {Back} from "./icon/Back.tsx";
import {Next} from "./icon/Next.tsx";

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

  return <span className={className}>
    <Button disabled={!prev} onClick={() => onChange(prev!)} className="mr-2"><Back /></Button>
    <span className="inline-block justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold ring-1 p-2 ring-slate-400 border-b-1 border-slate-600">{props.current}</span>
    <Button disabled={!next} onClick={() => onChange(next!)} className="ml-2"><Next /></Button>
  </span>
}