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
  let className = "relative";
  if (props.className) {
    className += ` ${props.className}`;
  }

  let labelClassname =
    "absolute text-sm duration-300 transform -translate-y-4 text-xs top-5 z-10 origin-[0] start-2.5";
  if (props.errorLabel) {
    labelClassname += " text-red-500";
  } else {
    labelClassname += " text-gray-500";
  }

  let inputClassname =
    "block rounded-md px-2 pb-1 pt-5 w-full text-sm bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-slate-600 peer";
  if (props.disabled) {
    inputClassname += `  cursor-not-allowed text-slate-500`;
  }

  const label = props.errorLabel
    ? `${props.label} error: ${props.errorLabel}`
    : props.label;

  return (
    <div className={className}>
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
      <label htmlFor="floating_filled" className={labelClassname}>
        {label}
      </label>
    </div>
  );
}
