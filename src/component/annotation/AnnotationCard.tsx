import { Card } from "../common/Card.tsx";
import { toContainerName } from "../../util/toContainerName.ts";
import { External } from "../common/icon/External.tsx";
import { H5 } from "../common/H5.tsx";
import { isUrl } from "../../util/isUrl.ts";
import ReactJsonView from "@microlink/react-json-view";
import { useState } from "react";
import { get, isObject } from "lodash";
import { useConfig } from "../ConfigProvider.tsx";
import { useDelete } from "../../client/query/useDelete.tsx";
import { toAnnotationGroups } from "../../util/toAnnotationGroups.ts";
import { useContainerAnnotation } from "../../client/endpoint/useContainerAnnotation.tsx";
import { StatusMessage } from "../common/StatusMessage.tsx";
import { hashIncludes } from "../../client/query/useGet.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { Checkbox } from "../common/Checkbox.tsx";
import { useStore } from "../../store/useStore.ts";
import { Badge } from "./Badge.tsx";

import { AnnotationButton } from "./AnnotationButton.tsx";
import { orThrow } from "../../util/orThrow.ts";
import { useNavigate } from "@tanstack/react-router";
import { UserRole } from "../../model/user/UserRole.tsx";
import { canEdit } from "../../model/user/canEdit.ts";

type PathValue = { path: string; value: string };

export function AnnotationCard(props: { id: string; role?: UserRole }) {
  const queryClient = useQueryClient();
  const annotationPreview = useConfig().annotationPreview;

  const { id, role } = props;

  const { selectedAnnotationIds, setSelectedAnnotationsState } = useStore();

  const parsed = toAnnotationGroups(id) ?? orThrow(`Could not parse ${id}`);

  const { containerName, annotationName } = parsed;
  const annotationRequest = useContainerAnnotation(
    containerName,
    annotationName,
  );
  const annotation = annotationRequest.data?.annotation;
  const ETag = annotationRequest.data?.ETag;
  const [isBodyOpen, setBodyOpen] = useState(false);
  const [isTargetOpen, setTargetOpen] = useState(false);

  const deleteAnnotation = useDelete("/w3c/{containerName}/{annotationName}");
  const navigate = useNavigate();
  function handleDelete() {
    if (!window.confirm("Delete annotation?")) {
      return;
    }
    deleteAnnotation.mutate(
      {
        params: {
          path: { containerName, annotationName },
        },
        headers: { "If-Match": ETag },
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            predicate: (query) => hashIncludes(query, "containerName"),
          });
        },
      },
    );
  }

  if (!annotation) {
    return <StatusMessage name="annotation" requests={[annotationRequest]} />;
  }

  const name = toContainerName(annotation.via || annotation.id);
  const previewProps = annotationPreview.paths.map((path) => ({
    path,
    value: get(annotation, path),
  }));
  const bodies: PathValue[] = Array.isArray(annotation.body)
    ? annotation.body
    : [annotation.body];

  const bodyPreviewProps: PathValue[] = annotationPreview.body.paths.map(
    (path) => ({ path, value: bodies.map((b) => get(b, path)).join(", ") }),
  );

  const isSelected = selectedAnnotationIds.includes(id);

  function navigateToAnnotation() {
    return navigate({
      to: "/container/$containerName/annotation/$annotationName",
      params: { containerName, annotationName },
    });
  }

  return (
    <div className="flex gap-4">
      {canEdit(role) && (
        <div className="py-4">
          <Checkbox
            value={isSelected ? "checked" : "unchecked"}
            onClick={() => {
              const update = isSelected
                ? selectedAnnotationIds.filter((sa) => sa !== id)
                : [...selectedAnnotationIds, id];
              setSelectedAnnotationsState({
                selectedAnnotationIds: update,
              });
            }}
            className="hover:text-inherit hover:cursor-pointer text-neutral-600"
          />
        </div>
      )}
      <Card
        className="bg-anrep-blue-50 text-anrep-blue-800"
        header={
          <div className="flex justify-between items-center border-b border-anrep-blue-100">
            <span className="cursor-pointer" onClick={navigateToAnnotation}>
              <H5>{name}</H5>
            </span>
            <div className="p-4">
              <img
                src="/images/icon-annotation.png"
                className="h-4 w-4"
                alt=""
              />
            </div>
          </div>
        }
        footer={
          <div className="flex gap-4">
            <AnnotationButton onClick={() => setBodyOpen((prev) => !prev)}>
              View body
            </AnnotationButton>
            <AnnotationButton
              onClick={() =>
                isUrl(annotation.target)
                  ? window.open(annotation.target)
                  : setTargetOpen((prev) => !prev)
              }
            >
              View target <External className="ml-1" />
            </AnnotationButton>
            <AnnotationButton
              onClick={() => window.open(annotation.id, "_blank")}
            >
              View source <External className="ml-1" />
            </AnnotationButton>
            {canEdit(role) && (
              <AnnotationButton onClick={handleDelete}>Remove</AnnotationButton>
            )}
          </div>
        }
      >
        <div className="flex flex-wrap gap-4">
          {previewProps
            .filter((p) => p.value)
            .map((p, i) => (
              <Badge
                key={i}
                label={p.path.replace(".", " ")}
                value={isObject(p.value) ? JSON.stringify(p.value) : p.value}
              />
            ))}
          {bodyPreviewProps
            .filter((p) => p.value)
            .map((p, i) => (
              <Badge
                key={i}
                label={p.path.replace(".", " ")}
                value={
                  typeof p.value === "object"
                    ? JSON.stringify(p.value)
                    : p.value
                }
              />
            ))}
        </div>
        {isBodyOpen && (
          <div className="mt-4">
            <ReactJsonView src={annotation.body} name={null} />
          </div>
        )}
        {isTargetOpen && annotation.target && !isUrl(annotation.target) && (
          <div className="mt-4">
            <ReactJsonView src={annotation.target as object} name={null} />
          </div>
        )}
      </Card>
    </div>
  );
}
