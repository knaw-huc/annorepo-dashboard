import {ArAnnotation, ArAnnotationPage} from "../../client/ArModel.ts";
import {PageNavigation} from "../common/PageNavigation.tsx";
import {AnnotationCard} from "./AnnotationCard.tsx";

export function AnnotationPage(props: {
  pageNo: number
  page: ArAnnotationPage
  onChangePageNo: (page: string) => void
}) {
  const {page, pageNo, onChangePageNo} = props;
  const {prev, next} = page;
  return <div>
    <PageNavigation
      current={pageNo}
      prev={prev}
      next={next}
      onChange={onChangePageNo}
    />
    <AnnotationGrid items={page.items}/>
    <PageNavigation
      current={pageNo}
      prev={prev}
      next={next}
      onChange={onChangePageNo}
      className="mt-3"
    />
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