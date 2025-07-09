import {ArAnnotation, ArAnnotationPage} from "../../client/ArModel.ts";
import {PageNavigation} from "../common/PageNavigation.tsx";
import {AnnotationCard} from "./AnnotationCard.tsx";
import {Button} from "../common/Button.tsx";
import {useStore} from "../../store/useStore.ts";
import {invalidateBy} from "../../client/query/useGet.tsx";
import {parseAnnotationId} from "./parseAnnotationId.ts";
import {useQueryClient} from "@tanstack/react-query";
import {
  useContainerAnnotations
} from "../../client/endpoint/useContainerAnnotations.tsx";
import {useState} from "react";
import {useDeleteMultiple} from "../../client/query/useDeleteMultiple.tsx";

export function AnnotationPage(props: {
  pageNo: number
  page: ArAnnotationPage
  onChangePageNo: (page: string) => void
  className?: string
}) {

  const {page, pageNo, onChangePageNo} = props;
  const queryClient = useQueryClient()
  const {selectedAnnotationIds, setSelectedAnnotationsState} = useStore()
  const deleteAnnotation = useDeleteMultiple("/w3c/{containerName}/{annotationName}")
  const selectedAnnotations = useContainerAnnotations(selectedAnnotationIds)
  const [isDeleting, setDeleting] = useState(false)

  function handleDeleteAll() {
    const toDeleteList = toList(selectedAnnotationIds);
    if (!window.confirm(`Delete these annotations?\n${toDeleteList}`)) {
      return;
    }

    if (isDeleting) {
      return;
    }

    setDeleting(true)
    const toDelete = selectedAnnotationIds
      .map(parseAnnotationId)
    const idWithETag = selectedAnnotations
      .filter(sa => sa.data)
      .map(sa => ({id: sa.data!.annotation.id, ETag: sa.data!.ETag}))

    const params = []

    for (let i = 0; i < selectedAnnotationIds.length; i++) {
      const id = selectedAnnotationIds[i]

      const pathParams = toDelete[i];
      if (!pathParams) {
        console.warn(`Could not delete ${id}: no path params`)
        continue;
      }

      const ETag = idWithETag.find(i => i.id === id)?.ETag
      if (!ETag) {
        console.warn(`Could not delete ${id}: no ETag`)
        continue;
      }
      console.log('Start deleting', id)
      params.push(
        {
          params: {
            path: pathParams,
          },
          headers: {'If-Match': ETag},
        }
      )
    }

    deleteAnnotation.mutate(params, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          predicate: query => invalidateBy(query, 'containerName')
        })
        setSelectedAnnotationsState({selectedAnnotationIds: []})
        setDeleting(false);
      },
      onError: async (error: Error) => {
        console.error('Deleting annotations failed:', error)
      }
    })
  }

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
      <div className="ml-3">
        <Button
          disabled={!selectedAnnotations.length}
          onClick={handleDeleteAll}
        >
          Delete
          selected{selectedAnnotations.length ? <>&nbsp;({selectedAnnotations.length})</> : ''}
        </Button>
      </div>
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

function toList(selectedAnnotationIds: string[]) {
  return selectedAnnotationIds.map(id => {
    const nameOrId = parseAnnotationId(id)?.annotationName ?? id;
    return `- ${nameOrId}`;
  }).join('\n');
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