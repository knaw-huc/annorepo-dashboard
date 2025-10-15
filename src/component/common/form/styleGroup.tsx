import { GroupPosition } from "./GroupPosition.tsx";

export function styleGroup(groupAt?: GroupPosition) {
  if (!groupAt) {
    return ` rounded`;
  } else if (groupAt === "right") {
    return ` rounded-l border-r-0`;
  } else if (groupAt === "left") {
    return ` rounded-r border-l-1`;
  } else {
    throw new Error(`Unknown group: ${groupAt}`);
  }
}
