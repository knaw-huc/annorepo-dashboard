import { Loading } from "../common/Loading.tsx";
import { useContainer } from "../../client/endpoint/useContainer.tsx";
import { ContainerAnnotationPage } from "./ContainerAnnotationPage.tsx";
import { ContainerAnnotationFields } from "./ContainerAnnotationFields.tsx";
import { useEffect, useState } from "react";
import { toPageNo } from "../../util/toPageNo.ts";
import { StatusMessage } from "../common/StatusMessage.tsx";
import { canEdit } from "../../model/user/canEdit.ts";
import { useContainerRole } from "./useContainerRole.tsx";
import { useDelete } from "../../client/query/useDelete.tsx";
import { Warning } from "../common/Warning.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { keyEquals } from "../../client/query/useGet.tsx";
import { ContainerSummary } from "./ContainerSummary.tsx";
import { usePageLayout } from "../common/PageLayoutContext.tsx";
import { NeutralButton } from "../common/NeutralButton.tsx";
import { ContainerUsers } from "./ContainerUsers.tsx";
import { H2 } from "../common/H2.tsx";
import { isAdmin } from "../../model/user/isAdmin.ts";
import { SelectOption } from "../common/form/SelectOption.tsx";
import { ContainerDetailTabs } from "./ContainerDetailTabs.tsx";

export type ContainerDetailProps = {
  name: string;
  onClose: () => void;
  onCreateAnnotation: () => void;
  onSearchAnnotations: () => void;
};

const NO_PAGE = -1;

const tabs: SelectOption[] = [
  { value: "annotations", label: "Annotations" },
  { value: "users", label: "Users" },
];

export function ContainerDetail(props: ContainerDetailProps) {
  const { name } = props;
  const [pageNo, setPageNo] = useState<number>(NO_PAGE);
  const [isInit, setInit] = useState(false);
  const [error, setError] = useState("");
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const container = useContainer(name);
  const role = useContainerRole({ idOrName: name });
  const removeContainer = useDelete("/w3c/{containerName}");
  const queryClient = useQueryClient();
  const { setSecondColumn } = usePageLayout();

  useEffect(() => {
    if (isInit || !container.data) {
      return;
    }
    setInit(true);
    const containerPageId = container.data.first.id;
    setPageNo(toPageNo(containerPageId));
  }, [container, setInit]);

  useEffect(() => {
    setSecondColumn(<ContainerAnnotationFields name={name} />);
    return () => setSecondColumn(null);
  }, [name]);

  const handleChangePage = (update: number) => {
    setPageNo(update);
  };

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
        <div>
          <NeutralButton
            onClick={() => window.open(container.data.id, "_blank")}
          >
            View source
          </NeutralButton>
          <NeutralButton onClick={handleRemove} className="ml-2">
            Remove
          </NeutralButton>
        </div>
      </div>

      {error && <Warning onClose={() => setError("")}>{error}</Warning>}

      <ContainerDetailTabs
        tabs={tabs}
        selected={selectedTab}
        onClick={setSelectedTab}
      />

      {isAdmin(role) && <ContainerUsers containerName={name} />}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center my-4 gap-4">
        <H2>Annotations</H2>
        <div className="flex gap-4 items-center justify-between">
          {canEdit(role) && (
            <button
              className="bg-neutral-100 rounded-full border border-neutral-200 px-3 py-1 text-sm cursor-pointer hover:bg-neutral-50 hover:border-neutral-400 transition text-neutral-800"
              onClick={props.onCreateAnnotation}
            >
              Add
            </button>
          )}
          <div>
            <NeutralButton onClick={props.onSearchAnnotations}>
              Search
            </NeutralButton>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {pageNo === NO_PAGE ? (
          <Loading name="annotations" />
        ) : (
          <ContainerAnnotationPage
            containerName={name}
            pageNo={pageNo}
            onChangePageNo={handleChangePage}
            role={role}
          />
        )}
      </div>
    </>
  );
}
