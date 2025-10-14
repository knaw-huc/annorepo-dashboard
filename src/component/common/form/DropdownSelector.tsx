import { ChangeEvent, ReactNode, useId } from "react";
import { SelectOption } from "./SelectOption.tsx";
import { Label } from "./Label.tsx";
import { orThrow } from "../../../util/orThrow.ts";

export function DropdownSelector<T extends string>(props: {
  label?: ReactNode;
  selectedValue?: string;
  options: SelectOption<T>[];
  onSelect: (option: SelectOption<T>) => void;
  className?: string;
  disabled?: boolean;
}) {
  const { options } = props;
  const selectId = useId();

  let className = "relative inline-block text-left";
  if (props.className) {
    className += ` ${props.className}`;
  }

  function handleSelect(e: ChangeEvent<HTMLSelectElement>) {
    const selected =
      options.find((o) => o.value === e.target.value) ??
      orThrow(`No option found with value: ${e.target.value}`);
    props.onSelect(selected);
  }

  let buttonClassname =
    "flex items-center gap-2 bg-anrep-green-100 p-2 rounded-sm";
  buttonClassname += props.disabled
    ? " cursor-not-allowed  text-gray-400"
    : " hover:bg-gray-50 text-gray-900";

  const selected = options.find((o) => o.value === props.selectedValue);

  return (
    <div className={className}>
      <Label text={props.label || "Select below"} htmlFor={selectId} />
      <select
        id={selectId}
        disabled={props.disabled}
        className={buttonClassname}
        value={selected?.value}
        onChange={handleSelect}
      >
        {options.map((option) => (
          <option key={`${option.value}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
