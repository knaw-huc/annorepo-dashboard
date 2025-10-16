import { Label } from "./Label.tsx";
import { useId } from "react";

export function Textarea(props: {
  value: string;
  label: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}) {
  const textareaId = useId();
  let textareaClassname =
    "rounded-sm border border-neutral-300 bg-white min-h-40 text-sm p-1";
  if (props.disabled) {
    textareaClassname += `  cursor-not-allowed text-slate-500`;
  }
  return (
    <div className="flex flex-col gap-1">
      <Label text={props.label} htmlFor={textareaId} />
      <textarea
        id={textareaId}
        placeholder={props.label}
        onChange={(e) => props.onChange(e.target.value)}
        disabled={props.disabled}
        rows={4}
        className={textareaClassname}
        value={props.value}
      ></textarea>
    </div>
  );
}
