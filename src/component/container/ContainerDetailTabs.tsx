import { SelectOption } from "../common/form/SelectOption.tsx";
import { ReactNode } from "react";

export function ContainerDetailTabs<T extends SelectOption>(props: {
  tabs: readonly T[];
  selected: T;
  onClick: (option: T) => void;
}) {
  return (
    <div className="flex mt-4 border-b border-anrep-green-400 *:w-40">
      {props.tabs.map((tab, i) => (
        <Tab
          label={tab.label}
          onClick={() => props.onClick(tab)}
          isActive={tab.value === props.selected.value}
          key={i}
        />
      ))}
    </div>
  );
}

function Tab(props: {
  label: ReactNode;
  onClick: () => void;
  isActive: boolean;
}) {
  let className = "border-b-4 p-2 hover:border-anrep-green-300 text-left";
  if (props.isActive) {
    className += " border-anrep-green-400 font-bold";
  } else {
    className += " border-anrep-green-50 font-normal";
  }

  return (
    <button className={className} onClick={props.onClick}>
      {props.label}
    </button>
  );
}
