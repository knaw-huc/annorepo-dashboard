import { ArAnnotation, ArAnnotationPage } from "../../model/ArModel.ts";
import { PageNavigation } from "../common/PageNavigation.tsx";
import { AnnotationCard } from "./AnnotationCard.tsx";
import { SelectionStatus } from "./SelectionStatus.tsx";
import { DeleteSelected } from "./DeleteSelected.tsx";
import { UserRole } from "../../model/user/UserRole.tsx";
import { canEdit } from "../../model/user/canEdit.ts";

export function AnnotationPage(props: {
  pageNo: number;
  page: ArAnnotationPage;
  onChangePageNo: (page: string) => void;
  className?: string;
  canDelete?: boolean;
  role?: UserRole;
}) {
  const { page, pageNo, onChangePageNo, canDelete, role } = props;

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
        {canDelete && (
          <span className="ml-5">
            <SelectionStatus items={page.items} />
            {canEdit(role || UserRole.UNKNOWN) && <DeleteSelected />}
          </span>
        )}
      </div>
      <AnnotationGrid items={page.items} />
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

export function AnnotationGrid(props: { items: ArAnnotation[] }) {
  const { items } = props;

  return (
    <div className="grid grid-cols-3 gap-5">
      {items.map((item) => (
        <AnnotationCard key={item.id} id={item.id} />
      ))}
    </div>
  );
}
