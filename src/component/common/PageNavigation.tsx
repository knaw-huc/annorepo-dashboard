import { DeprecatedButton } from "./DeprecatedButton.tsx";
import { Back } from "./icon/Back.tsx";
import { Next } from "./icon/Next.tsx";

export function PageNavigation(props: {
  prev?: string;
  current: number;
  next?: string;
  onChange: (page: string) => void;
  className?: string;
}) {
  let className = "";
  if (props.className) className += ` ${props.className}`;

  const { prev, next, onChange } = props;

  return (
    <span className={className}>
      <DeprecatedButton
        disabled={!prev}
        onClick={() => onChange(prev!)}
        className="mr-2"
      >
        <Back />
      </DeprecatedButton>
      <span className="inline-block justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold ring-1 p-2 ring-slate-400 border-b-1 border-slate-600">
        {props.current}
      </span>
      <DeprecatedButton
        disabled={!next}
        onClick={() => onChange(next!)}
        className="ml-2"
      >
        <Next />
      </DeprecatedButton>
    </span>
  );
}
