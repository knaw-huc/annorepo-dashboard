import { ReactNode, useId } from "react";

export function CheckboxWithLabel(props: {
  label: ReactNode;
  value: boolean;
  onChange: (update: boolean) => void;
  disabled?: boolean;
  className?: string;
}) {
  const { label, value, onChange, disabled } = props;

  let className = "flex items-center";
  if (props.className) {
    className += ` ${props.className}`;
  }
  const checkboxId = useId();

  return (
    <div className={className}>
      <input
        id={checkboxId}
        type="checkbox"
        defaultChecked={value}
        onChange={() => onChange(!value)}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        disabled={disabled}
      />
      <label
        htmlFor={checkboxId}
        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
    </div>
  );
}
