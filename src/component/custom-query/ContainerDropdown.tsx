import { useGet } from "../../client/query/useGet.tsx";
import { ArMyContainers } from "../../model/ArModel.ts";
import { getContainerNames } from "../../client/endpoint/getContainerNames.tsx";
import { DropdownSelector } from "../common/form/DropdownSelector.tsx";
import { QR } from "../../client/query/QR.tsx";

export function ContainerDropdown(props: {
  selected: string;
  onSelect: (containerName: string) => void;
}) {
  const { selected, onSelect } = props;

  const myContainers = useGet("/my/containers") as QR<ArMyContainers>;
  const containerNames = getContainerNames(myContainers.data);

  return (
    <div className="flex items-center gap-2 bg-anrep-green-100 p-1 pl-4 rounded-sm ">
      <img className="h-4 w-4" src="/images/icon-container.png" alt="" />
      <DropdownSelector
        selectClassName="bg-anrep-green-100"
        placeholder="Select a container..."
        className="mr-3"
        selectedValue={selected}
        options={containerNames.map((key) => ({ label: key, value: key }))}
        onSelect={(option) => onSelect(option.value)}
      />
    </div>
  );
}
