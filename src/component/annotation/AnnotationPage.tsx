import {ArAnnotation, ArAnnotationPage} from "../../client/ArModel.ts";
import {PageNavigation} from "../common/PageNavigation.tsx";
import {AnnotationCard} from "./AnnotationCard.tsx";
import {SelectionStatus} from "../container/SelectionStatus.tsx";
import {DeleteSelected} from "../container/DeleteSelected.tsx";

export function AnnotationPage(props: {
  pageNo: number
  page: ArAnnotationPage
  onChangePageNo: (page: string) => void
  className?: string
  canDelete?: boolean
}) {

  const {page, pageNo, onChangePageNo, canDelete} = props;

  const {prev, next} = page;

  if (!props.page.items.length) {
    return <>
      <p className="mt-5">No results</p>
    </>;
  }
  return <div className={props.className || ''}>
    <div className="flex">
      <PageNavigation
        current={pageNo}
        prev={prev}
        next={next}
        onChange={onChangePageNo}
      />
      {canDelete && <span className="ml-5">
        <SelectionStatus items={page.items}/>
        <DeleteSelected/>
      </span>}
    </div>
    <AnnotationGrid
      items={page.items}
    />
    <div className="mt-3">
      <PageNavigation
        current={pageNo}
        prev={prev}
        next={next}
        onChange={onChangePageNo}
      />
    </div>
  </div>
}

export function AnnotationGrid(props: {
  items: ArAnnotation[]
}) {
  const {items} = props;

  return <div
    className="grid grid-cols-3 gap-5"
  >
    {items.map((item) => <AnnotationCard
      key={item.id}
      id={item.id}
    />)}
  </div>
}