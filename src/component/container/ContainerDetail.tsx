import { useContainer } from "../../client/endpoint/useContainer.tsx";
import { useEffect, useState } from "react";
import { toPageNo } from "../../util/toPageNo.ts";
import { StatusMessage } from "../common/StatusMessage.tsx";
import { useContainerRole } from "./useContainerRole.tsx";
import { useDelete } from "../../client/query/useDelete.tsx";
import { Warning } from "../common/Warning.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { keyEquals } from "../../client/query/useGet.tsx";
import { ContainerSummary } from "./ContainerSummary.tsx";
import { NeutralButton } from "../common/NeutralButton.tsx";
import { ContainerUsers } from "./ContainerUsers.tsx";
import { isAdmin } from "../../model/user/isAdmin.ts";
import { ContainerDetailTabs } from "./ContainerDetailTabs.tsx";
import { Bin } from "../common/icon/Bin.tsx";
import { SelectOption } from "../common/form/SelectOption.tsx";
import { ContainerAnnotations } from "./ContainerAnnotations.tsx";

export type ContainerDetailProps = {
  name: string;
  onClose: () => void;
  onCreateAnnotation: () => void;
  onSearchAnnotations: () => void;
};

export const NO_PAGE = -1;

const tabs = [
  { value: "annotations", label: "Annotations" },
  { value: "users", label: "Users" },
] as const;
type ContainerDetailTab = SelectOption & (typeof tabs)[number];

export function ContainerDetail(props: ContainerDetailProps) {
  const { name } = props;
  const [pageNo, setPageNo] = useState<number>(NO_PAGE);
  const [isInit, setInit] = useState(false);
  const [error, setError] = useState("");
  const [selectedTab, setSelectedTab] = useState<ContainerDetailTab>(tabs[0]);

  const container = useContainer(name);
  const role = useContainerRole({ idOrName: name });
  const removeContainer = useDelete("/w3c/{containerName}");
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isInit || !container.data) {
      return;
    }
    setInit(true);
    const containerPageId = container.data.first.id;
    setPageNo(toPageNo(containerPageId));
  }, [container, setInit]);

  const handleRemove = () => {
    if (
      !window.confirm(
        "Delete container?\nPlease note that this will also delete all of its annotations.",
      )
    ) {
      return;
    }
    if (!container.data) {
      return;
    }
    removeContainer.mutate(
      {
        params: {
          path: { containerName: name },
          query: { force: true },
        },
        headers: { "If-Match": container.data.ETag },
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            predicate: (query) => keyEquals(query, "/w3c", "/my/containers"),
          });
          props.onClose();
        },
        onError: (e) => setError(`Could not remove container: ${e.message}`),
      },
    );
  };

  if (!container.isSuccess) {
    return <StatusMessage name="container" requests={[container]} />;
  }

  return (
    <>
      <div className="flex justify-between w-full my-8 mx-auto max-w-5xl">
        <div>
          <h1 className="text-2xl">
            <img
              src="/images/icon-container.png"
              className="h-5 w-5 -translate-y-4"
              alt=""
            />{" "}
            {container.data.label}
          </h1>
          <ContainerSummary name={name} role={role} />
        </div>
        <div className="flex gap-4 items-center">
          <NeutralButton
            onClick={() => window.open(container.data.id, "_blank")}
          >
            View source
          </NeutralButton>
          <NeutralButton onClick={handleRemove}>
            <Bin />
          </NeutralButton>
        </div>
      </div>

      {error && <Warning onClose={() => setError("")}>{error}</Warning>}

      <ContainerDetailTabs
        tabs={tabs}
        selected={selectedTab}
        onClick={setSelectedTab}
      />

      {selectedTab.value === "users" && isAdmin(role) && (
        <ContainerUsers containerName={name} />
      )}
      {selectedTab.value === "annotations" && (
        <ContainerAnnotations
          name={name}
          role={role}
          pageNo={pageNo}
          onChangePageNo={setPageNo}
          onCreateAnnotation={props.onCreateAnnotation}
          onSearchAnnotations={props.onSearchAnnotations}
        />
      )}
    </>
  );
}
