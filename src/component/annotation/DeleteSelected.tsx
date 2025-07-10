import {Button} from "../common/Button.tsx";
import {useQueryClient} from "@tanstack/react-query";
import {useStore} from "../../store/useStore.ts";
import {useDeleteMultiple} from "../../client/query/useDeleteMultiple.tsx";
import {
  useContainerAnnotations
} from "../../client/endpoint/useContainerAnnotations.tsx";
import {useState} from "react";
import {parseAnnotationId} from "./parseAnnotationId.ts";
import {invalidateBy} from "../../client/query/useGet.tsx";

export function DeleteSelected() {
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
        console.warn(`Can not delete ${id}: does not match path params`)
        continue;
      }

      const ETag = idWithETag.find(i => i.id === id)?.ETag
      if (!ETag) {
        console.warn(`Can not delete ${id}: no ETag`)
        continue;
      }
      params.push({
        params: {
          path: pathParams,
        },
        headers: {'If-Match': ETag},
      })
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


  return <Button
    secondary
    className="ml-2"
    disabled={!selectedAnnotations.length}
    onClick={handleDeleteAll}
  >
    Delete selected
    {selectedAnnotations.length ? <>&nbsp;({selectedAnnotations.length})</> : ''}
  </Button>

}


function toList(selectedAnnotationIds: string[]) {
  return selectedAnnotationIds.map(id => {
    const nameOrId = parseAnnotationId(id)?.annotationName ?? id;
    return `- ${nameOrId}`;
  }).join('\n');
}
