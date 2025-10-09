import { DeprecatedButton } from "../common/DeprecatedButton.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { useStore } from "../../store/useStore.ts";
import { useDeleteMultiple } from "../../client/query/useDeleteMultiple.tsx";
import { useContainerAnnotations } from "../../client/endpoint/useContainerAnnotations.tsx";
import { useState } from "react";
import { toAnnotationGroups } from "../../util/toAnnotationGroups.ts";
import { getContainerQuery } from "../../client/endpoint/useContainer.tsx";

export function DeleteSelected() {
  const queryClient = useQueryClient();
  const { selectedAnnotationIds, setSelectedAnnotationsState } = useStore();
  const deleteAnnotation = useDeleteMultiple(
    "/w3c/{containerName}/{annotationName}",
  );
  const selectedAnnotations = useContainerAnnotations(selectedAnnotationIds);
  const [isDeleting, setDeleting] = useState(false);

  function handleDeleteAll() {
    const toDeleteList = toList(selectedAnnotationIds);
    if (!window.confirm(`Delete these annotations?\n${toDeleteList}`)) {
      return;
    }

    if (isDeleting) {
      return;
    }

    setDeleting(true);
    const toDelete = selectedAnnotationIds.map(toAnnotationGroups);
    const idWithETag = selectedAnnotations
      .filter((sa) => sa.data)
      .map((sa) => ({ id: sa.data!.annotation.id, ETag: sa.data!.ETag }));

    const params = [];
    const containers = new Set<string>();

    for (let i = 0; i < selectedAnnotationIds.length; i++) {
      const id = selectedAnnotationIds[i];

      const pathParams = toDelete[i];
      if (!pathParams) {
        console.warn(`Can not delete ${id}: does not match path params`);
        continue;
      }
      containers.add(pathParams.containerName);

      const ETag = idWithETag.find((i) => i.id === id)?.ETag;
      if (!ETag) {
        console.warn(`Can not delete ${id}: no ETag`);
        continue;
      }
      params.push({
        params: {
          path: pathParams,
        },
        headers: { "If-Match": ETag },
      });
    }

    deleteAnnotation.mutate(params, {
      onSuccess: async () => {
        containers.forEach((c) =>
          queryClient.invalidateQueries({ queryKey: getContainerQuery(c).key }),
        );
        setSelectedAnnotationsState({ selectedAnnotationIds: [] });
        setDeleting(false);
      },
      onError: async (error: Error) => {
        console.error("Deleting annotations failed:", error);
      },
    });
  }

  return (
    <DeprecatedButton
      secondary
      className="ml-2"
      disabled={!selectedAnnotations.length}
      onClick={handleDeleteAll}
    >
      Delete selected
      {selectedAnnotations.length ? (
        <>&nbsp;({selectedAnnotations.length})</>
      ) : (
        ""
      )}
    </DeprecatedButton>
  );
}

function toList(selectedAnnotationIds: string[]) {
  return selectedAnnotationIds
    .map((id) => {
      const nameOrId = toAnnotationGroups(id)?.annotationName ?? id;
      return `- ${nameOrId}`;
    })
    .join("\n");
}
