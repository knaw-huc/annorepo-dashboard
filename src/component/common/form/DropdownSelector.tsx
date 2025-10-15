import { ChangeEvent, ReactNode, useId } from "react";
import { SelectOption } from "./SelectOption.tsx";
import { Label } from "./Label.tsx";
import { orThrow } from "../../../util/orThrow.ts";
import { GroupPosition } from "./GroupPosition.tsx";
import { styleGroup } from "./styleGroup.tsx";

export function DropdownSelector<T extends string>(props: {
  options: SelectOption<T>[];
  onSelect: (option: SelectOption<T>) => void;

  label?: ReactNode;
  selectedValue?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  selectClassName?: string;
  groupAt?: GroupPosition;
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

  let selectClassname = "flex items-center gap-2 p-2 h-8 py-1 border";
  if (props.selectClassName) {
    selectClassname += ` ${props.selectClassName}`;
  }
  selectClassname += props.disabled
    ? " cursor-not-allowed text-gray-400"
    : " cursor-pointer text-gray-900";
  selectClassname += ` ${styleGroup(props.groupAt)}`;

  const selected = options.find((o) => o.value === props.selectedValue);

  return (
    <div className={className}>
      {props.label && <Label text={props.label} htmlFor={selectId} />}
      <select
        id={selectId}
        disabled={props.disabled}
        className={selectClassname}
        value={selected?.value ?? ""}
        onChange={handleSelect}
      >
        <option value="" disabled>
          {props.placeholder ?? "Please select..."}
        </option>
        {options.map((option) => (
          <option key={`${option.value}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
