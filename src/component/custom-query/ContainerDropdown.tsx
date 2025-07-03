import {QR, useGet} from "../../client/query/useGet.tsx";
import {ArMyContainers} from "../../client/ArModel.ts";
import {getContainerNames} from "../../client/endpoint/getContainerNames.tsx";
import {DropdownSelector} from "../common/form/DropdownSelector.tsx";
import {Tooltip} from "../common/Tooltip.tsx";
import {Help} from "../common/icon/Help.tsx";

export function ContainerDropdown(props: {
  selected: string,
  onSelect: (containerName: string) => void
}) {
  const {selected, onSelect} = props;

  const myContainers = useGet('/my/containers') as QR<ArMyContainers>
  const containerNames = getContainerNames(myContainers.data)

  return <DropdownSelector
    placeholder={<>
      Select container
      <Tooltip
        text="Select a container to search and to see search suggestions">
        <Help className="ml-1"/>
      </Tooltip>
    </>}
    className="mr-3"
    selectedValue={selected}
    options={containerNames.map(key => ({label: key, value: key}))}
    onSelect={option => onSelect(option.value)}
  />
}