import { useMyContainerDetails } from "../../client/endpoint/useMyContainerDetails.tsx";
import { ContainerCard } from "./ContainerCard.tsx";
import { toContainerName } from "../../util/toContainerName.ts";
import isNil from "lodash/isNil";
import { StatusMessage } from "../common/StatusMessage.tsx";
import { getRolesByName } from "./getRolesByName.ts";

import { NeutralButton } from "../common/NeutralButton.tsx";
import { useStore } from "../../store/useStore.ts";
import { isAuthenticated } from "../../model/user/User.ts";

export function ContainerIndex(props: { onClickCreateContainer: () => void }) {
  const { user } = useStore();
  const { myContainers, details } = useMyContainerDetails();

  if (!myContainers.isSuccess || !details.every((d) => d.isSuccess)) {
    return <StatusMessage name="my containers" requests={details} />;
  }

  if (!details.length) {
    return null;
  }

  const names: string[] = details
    .map((c) => c.data && toContainerName(c.data.id))
    .filter((name) => !isNil(name));

  const rolesByContainerName = getRolesByName(myContainers.data);

  return (
    <div>
      <div className="flex justify-between w-full my-8">
        <h1 className="text-2xl">Containers</h1>
        {isAuthenticated(user) && (
          <NeutralButton onClick={props.onClickCreateContainer}>
            New container
          </NeutralButton>
        )}
      </div>
      <div className="gap-8 flex-wrap grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {names.map((name, i) => (
          <ContainerCard
            key={i}
            name={name}
            role={rolesByContainerName[name]}
          />
        ))}
      </div>
    </div>
  );
}
