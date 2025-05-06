import {ArAnnotation, ArAnnotationPage} from "../../client/ArModel.ts";
import {PageNavigation} from "../common/PageNavigation.tsx";
import {AnnotationCard} from "./AnnotationCard.tsx";
import {ReactNode} from "react";

export function AnnotationPage(props: {
  pageNo: number
  page: ArAnnotationPage
  onChangePageNo: (page: string) => void
  moreButtons?: ReactNode
}) {

  const {page, pageNo, onChangePageNo} = props;
  const {prev, next} = page;
  if (!props.page.items.length) {
    return;
  }
  return <div>
    <div>
      <PageNavigation
        current={pageNo}
        prev={prev}
        next={next}
        onChange={onChangePageNo}
      />
      {props.moreButtons}
    </div>
    <AnnotationGrid items={page.items}/>
    <div>
      <PageNavigation
        current={pageNo}
        prev={prev}
        next={next}
        onChange={onChangePageNo}
        className="mt-3"
      />
    </div>
  </div>
}

export function AnnotationGrid(props: { items: ArAnnotation[] }) {
  const {items} = props;

  return <div
    className="grid grid-cols-3 gap-5"
  >
    {items.map(item => <AnnotationCard
      key={item.id}
      annotation={item}
    />)}
  </div>
}