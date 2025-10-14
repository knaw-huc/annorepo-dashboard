import { Label } from "./Label.tsx";

export function InputWithLabel(props: {
  value: string;
  label: string;
  errorLabel?: string;

  disabled?: boolean;
  className?: string;

  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  autoComplete?: "on" | "off";

  type?: "text" | "password";
}) {
  let className = "flex flex-col gap-1";
  if (props.className) {
    className += ` ${props.className}`;
  }

  let inputClassname =
    "rounded bg-white border border-anrep-pink-300 px-2 py-1 text-sm h-8 min-w-40";
  if (props.disabled) {
    inputClassname += `  cursor-not-allowed text-slate-500`;
  }

  return (
    <div className={className}>
      <Label
        text={props.label}
        error={props.errorLabel}
        htmlFor="floating_filled"
      />
      <input
        disabled={!!props.disabled}
        type={props.type ?? "text"}
        id="floating_filled"
        className={inputClassname}
        value={props.value}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        onChange={(e) => props.onChange(e.target.value)}
        autoComplete={props.autoComplete ?? "on"}
      />
    </div>
  );
}
