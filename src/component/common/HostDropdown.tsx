import { useConfig } from "../ConfigProvider.tsx";
import { entries, truncate } from "lodash";
import { useStore } from "../../store/useStore.ts";
import { DropdownSelector } from "./form/DropdownSelector.tsx";
import { Hint } from "./Hint.tsx";

export function HostDropdown() {
  const config = useConfig();
  const hostOptions = entries(config.AR_HOSTS).map(([k, v]) => ({
    label: (
      <>
        {truncate(v.replace(/^https?:\/\//, ""), { length: 30 })} |{" "}
        <Hint>{k}</Hint>
      </>
    ),
    value: k,
  }));
  const { setHostState, selectedHost } = useStore();
  return (
    <>
      <DropdownSelector
        selectedValue={selectedHost}
        options={hostOptions}
        onSelect={(selected) => setHostState({ selectedHost: selected.value })}
        className="w-full"
      />
    </>
  );
}
