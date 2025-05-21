import {ArMyContainers} from "../ArModel.ts";

export function getContainerNames(
  myContainers?: ArMyContainers
): string[] {
  if (!myContainers) {
    return []
  }
  return Object
    .values(myContainers)
    .flatMap(names => names);
}