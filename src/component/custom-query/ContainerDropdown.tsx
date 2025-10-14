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
    <DropdownSelector
      placeholder={
        <>
          <img src="/images/icon-container.png" className="h-4 w-4" alt="" />
          Select container
        </>
      }
      className="mr-3"
      selectedValue={selected}
      options={containerNames.map((key) => ({ label: key, value: key }))}
      onSelect={(option) => onSelect(option.value)}
    />
  );
}
