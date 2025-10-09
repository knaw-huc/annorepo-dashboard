import { ArAnnotation, ArAnnotationPage } from "../../model/ArModel.ts";
import { PageNavigation } from "../common/PageNavigation.tsx";
import { AnnotationCard } from "./AnnotationCard.tsx";
import { SelectionStatus } from "./SelectionStatus.tsx";
import { DeleteSelected } from "./DeleteSelected.tsx";

export function AnnotationPage(props: {
  pageNo: number;
  page: ArAnnotationPage;
  onChangePageNo: (page: string) => void;
  className?: string;
  canSelect?: boolean;
  canEdit?: boolean;
}) {
  const { page, pageNo, onChangePageNo, canEdit } = props;

  const { prev, next } = page;

  if (!props.page.items.length) {
    return (
      <>
        <p className="mt-5">No results</p>
      </>
    );
  }
  return (
    <div className={props.className || ""}>
      <div className="flex">
        <PageNavigation
          current={pageNo}
          prev={prev}
          next={next}
          onChange={onChangePageNo}
        />
        {canEdit && (
          <span className="ml-5">
            <SelectionStatus items={page.items} />
            <DeleteSelected />
          </span>
        )}
      </div>
      <AnnotationGrid items={page.items} canEdit={canEdit} />
      <div className="mt-3">
        <PageNavigation
          current={pageNo}
          prev={prev}
          next={next}
          onChange={onChangePageNo}
        />
      </div>
    </div>
  );
}

export function AnnotationGrid(props: {
  items: ArAnnotation[];
  canEdit?: boolean;
}) {
  const { items, canEdit } = props;

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <AnnotationCard key={item.id} id={item.id} canSelect={canEdit} />
      ))}
    </div>
  );
}
