import {PropsWithChildren} from "react";
import {H2} from "../common/H2.tsx";
import {AnnotationCard} from "./AnnotationCard.tsx";
import {useContainerPage} from "../../client/endpoint/useContainerPage.tsx";
import {PageNavigation} from "./PageNavigation.tsx";
import {toPageNo} from "../../util/toPageNo.ts";

// TODO: add filter option
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

  const {prev, next} = page;

  function handlePageChange(pageUdate: string) {
    onChangePageNo(toPageNo(pageUdate));
  }

  return <div>
    <H2>Annotations</H2>
    <PageNavigation prev={prev} next={next} onChange={handlePageChange}/>
    <div
      className="grid grid-cols-3 gap-5"
    >
      {page.items.map(item => <AnnotationCard
        key={item.id}
        annotation={item}
      />)}
    </div>
    <PageNavigation prev={prev} next={next} onChange={handlePageChange}/>
  </div>
}

