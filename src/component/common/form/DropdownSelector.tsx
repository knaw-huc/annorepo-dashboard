import { ChangeEvent, ReactNode, useEffect, useRef } from "react";
import { SelectOption } from "./SelectOption.tsx";
import { Label } from "./Label.tsx";
import { orThrow } from "../../../util/orThrow.ts";
import { isEqual } from "lodash";
import * as _ from "lodash";
import { Any } from "../../../model/Any.ts";

export function DropdownSelector<T extends string>(props: {
  placeholder?: ReactNode;
  selectedValue?: string;
  options: SelectOption<T>[];
  onSelect: (option: SelectOption<T>) => void;
  className?: string;
  disabled?: boolean;
}) {
  const prevProps = useRef(props);
  useEffect(() => {
    const prev = prevProps.current;
    if (prev.selectedValue !== props.selectedValue) {
      // console.log('selectedValue changed:' + props.selectedValue);
    }
    if (prev.options !== props.options) {
      console.log("options reference changed");
    }
    if (!isEqual(prev.options, props.options)) {
      console.log("options CONTENT changed");
      const diff = deepArrayDiff(prev.options, props.options);
      console.log("-->", diff);
    }
    if (prev.onSelect !== props.onSelect) {
      console.log("onSelect reference changed");
    }
    prevProps.current = props;
  });

  const options = props.options.filter((o) => o.value !== props.selectedValue);

  let className = "relative inline-block text-left";
  if (props.className) {
    className += ` ${props.className}`;
  }

  function handleSelect(e: ChangeEvent<HTMLSelectElement>) {
    const eValue = e.target.value;
    const selected =
      options.find((o) => o.value === eValue) ??
      orThrow("No option with value " + eValue);
    props.onSelect(selected);
  }

  let buttonClassname =
    "flex items-center gap-2 bg-anrep-green-100 p-2 rounded-sm";
  buttonClassname += props.disabled
    ? " cursor-not-allowed  text-gray-400"
    : " hover:bg-gray-50 text-gray-900";

  const selected = options.find(
    (option) => option.value === props.selectedValue,
  );

  return (
    <div className={className}>
      <Label
        text={props.placeholder || "Select below"}
        htmlFor="floating_filled"
      />
      <select
        id="floating_filled"
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

function deepArrayDiff(arr1: Any, arr2: Any) {
  return {
    added: _.differenceWith(arr2, arr1, _.isEqual),
    removed: _.differenceWith(arr1, arr2, _.isEqual),
    common: _.intersectionWith(arr1, arr2, _.isEqual),
  };
}
