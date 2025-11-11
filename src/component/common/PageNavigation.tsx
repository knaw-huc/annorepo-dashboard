import { Back } from "./icon/Back.tsx";
import { Next } from "./icon/Next.tsx";
import { NeutralButton } from "./NeutralButton.tsx";

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
      <NeutralButton disabled={!prev} onClick={() => onChange(prev!)}>
        <Back />
      </NeutralButton>
      <span className="mx-4">{props.current + 1}</span>
      <NeutralButton disabled={!next} onClick={() => onChange(next!)}>
        <Next />
      </NeutralButton>
    </span>
  );
}
