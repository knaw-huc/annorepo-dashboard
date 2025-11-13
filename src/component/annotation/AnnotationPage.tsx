import { ArAnnotation, ArAnnotationPage } from "../../model/ArModel.ts";
import { PageNavigation } from "../common/PageNavigation.tsx";
import { AnnotationCard } from "./AnnotationCard.tsx";
import { toAnnotationGroups } from "../../util/toAnnotationGroups.ts";
import { Warning } from "../common/Warning.tsx";
import { UserRole } from "../../model/user/UserRole.tsx";
import { useState, useEffect } from "react";

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
  const [loadedCount, setLoadedCount] = useState(10);

  const batchSize = 10;
  useEffect(() => {
    if (loadedCount >= items.length) {
      return;
    }
    const timer = setTimeout(() => {
      setLoadedCount((prev) => {
        const nextBatch = prev + batchSize;
        return nextBatch < items.length ? nextBatch : items.length;
      });
    }, 100);
    return () => clearTimeout(timer);
  }, [loadedCount, items.length]);

  useEffect(() => {
    setLoadedCount(10);
  }, [items]);

  return (
    <>
      {items.map((item, index) => {
        const id = item.id;
        const parsed = toAnnotationGroups(id);
        if (!parsed) {
          return (
            <Warning key={id} level="info">
              Failed to display annotation, could not parse id: {id}
            </Warning>
          );
        }
        const enabled = index < loadedCount;
        return (
          <AnnotationCard
            key={item.id}
            id={item.id}
            role={role}
            enabled={enabled}
          />
        );
      })}
      {loadedCount < items.length && (
        <div className="text-center py-4 text-gray-500">
          Loading {items.length - loadedCount} more annotations...
        </div>
      )}
    </>
  );
}
