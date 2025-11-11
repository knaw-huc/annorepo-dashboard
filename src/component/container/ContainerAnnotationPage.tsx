import { PropsWithChildren } from "react";
import { useContainerPage } from "../../client/endpoint/useContainerPage.tsx";
import { toPageNo } from "../../util/toPageNo.ts";
import { AnnotationPage } from "../annotation/AnnotationPage.tsx";
import { UserRole } from "../../model/user/UserRole.tsx";
import { ContainerAnnotationFields } from "./ContainerAnnotationFields.tsx";

export function ContainerAnnotationPage(
  props: PropsWithChildren<{
    containerName: string;
    pageNo: number;
    onChangePageNo: (pageNo: number) => void;
    role: UserRole;
  }>,
) {
  const { containerName, pageNo, onChangePageNo, role } = props;
  const { data: page } = useContainerPage(containerName, pageNo);

  if (!page) {
    return null;
  }

  function handlePageChange(pageUdate: string) {
    onChangePageNo(toPageNo(pageUdate));
  }

  return (
    <div className="parent flex flex-col md:flex-row gap-8">
      <AnnotationPage
        className="flex flex-col gap-3 w-full md:w-3/4"
        pageNo={pageNo}
        page={page}
        onChangePageNo={handlePageChange}
        role={role}
      />
      {!!page.items.length && (
        <div className="flex-col p-4 bg-stone-50 w-full md:w-1/4">
          <ContainerAnnotationFields name={containerName} />
        </div>
      )}
    </div>
  );
}
