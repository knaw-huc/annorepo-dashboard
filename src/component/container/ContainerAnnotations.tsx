import { UserRole } from "../../model/user/UserRole.tsx";
import { useContainerPage } from "../../client/endpoint/useContainerPage.tsx";
import { StatusMessage } from "../common/StatusMessage.tsx";
import { canEdit } from "../../model/user/canEdit.ts";
import { SelectionStatus } from "../annotation/SelectionStatus.tsx";
import { DeleteSelected } from "../annotation/DeleteSelected.tsx";
import { NeutralButton } from "../common/NeutralButton.tsx";
import { Loading } from "../common/Loading.tsx";
import { ContainerAnnotationPage } from "./ContainerAnnotationPage.tsx";
import { NO_PAGE } from "./ContainerDetail.tsx";

export function ContainerAnnotations(props: {
  name: string;
  role: UserRole;
  pageNo: number;
  onChangePageNo: (pageNo: number) => void;
  onCreateAnnotation: () => void;
  onSearchAnnotations: () => void;
}) {
  const { name, role, pageNo } = props;
  const page = useContainerPage(name, pageNo);

  if (!page.isSuccess) {
    return <StatusMessage name="page" requests={[page]} />;
  }

  return (
    <>
      <div className="flex gap-4 items-center justify-between my-8">
        {canEdit(role) && (
          <div className="flex gap-2">
            <SelectionStatus annotations={page.data.items} />
            <DeleteSelected />
          </div>
        )}
        <div className="flex gap-2">
          {canEdit(role) && (
            <button
              className="bg-neutral-100 rounded-full border border-neutral-200 px-3 py-1 text-sm cursor-pointer hover:bg-neutral-50 hover:border-neutral-400 transition text-neutral-800"
              onClick={props.onCreateAnnotation}
            >
              Add annotation
            </button>
          )}
          <NeutralButton onClick={props.onSearchAnnotations}>
            Search
          </NeutralButton>
        </div>
      </div>

      <div className="flex flex-col">
        {pageNo === NO_PAGE ? (
          <Loading name="annotations" />
        ) : (
          <ContainerAnnotationPage
            containerName={name}
            pageNo={pageNo}
            onChangePageNo={props.onChangePageNo}
            role={role}
          />
        )}
      </div>
    </>
  );
}
