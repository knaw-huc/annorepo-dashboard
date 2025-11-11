import { ArAnnotation, ArAnnotationPage } from "../../model/ArModel.ts";
import { PageNavigation } from "../common/PageNavigation.tsx";
import { AnnotationCard } from "./AnnotationCard.tsx";
import { toAnnotationGroups } from "../../util/toAnnotationGroups.ts";
import { Warning } from "../common/Warning.tsx";
import { UserRole } from "../../model/user/UserRole.tsx";

export function AnnotationPage(props: {
  pageNo: number;
  page: ArAnnotationPage;
  onChangePageNo: (page: string) => void;
  className?: string;
  canSelect?: boolean;
  role?: UserRole;
}) {
  const { page, pageNo, onChangePageNo, role } = props;

  const { prev, next } = page;

  if (!props.page.items.length) {
    return (
      <>
        <p className="mt-5">No results</p>
      </>
    );
  }
  return (
    <div className={props.className || "flex flex-col gap-2"}>
      <AnnotationGrid items={page.items} role={role} />
      <div className="flex items-center justify-center mt-10">
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
  role?: UserRole;
}) {
  const { items, role } = props;

  return (
    <>
      {items.map((item) => {
        const id = item.id;
        const parsed = toAnnotationGroups(id);
        if (!parsed) {
          return (
            <Warning level="info">
              Failed to display annotation, could not parse id: {id}
            </Warning>
          );
        }
        return <AnnotationCard key={item.id} id={item.id} role={role} />;
      })}
    </>
  );
}
