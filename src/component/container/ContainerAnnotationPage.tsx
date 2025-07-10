import {PropsWithChildren} from "react";
import {useContainerPage} from "../../client/endpoint/useContainerPage.tsx";
import {toPageNo} from "../../util/toPageNo.ts";
import {AnnotationPage} from "../annotation/AnnotationPage.tsx";

export function ContainerAnnotationPage(props: PropsWithChildren<{
  containerName: string,
  pageNo: number
  onChangePageNo: (pageNo: number) => void
}>) {
  const {containerName, pageNo, onChangePageNo} = props;
  const {data: page} = useContainerPage(containerName, pageNo)

  if (!page) {
    return null;
  }

  function handlePageChange(pageUdate: string) {
    onChangePageNo(toPageNo(pageUdate));
  }

  return <AnnotationPage
    pageNo={pageNo}
    page={page}
    onChangePageNo={handlePageChange}
    canDelete
  />
}

