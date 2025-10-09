import { Card } from "../common/Card.tsx";
import { toContainerName } from "../../util/toContainerName.ts";
import { Pipe } from "../common/Pipe.tsx";
import { A } from "../common/A.tsx";
import { External } from "../common/icon/External.tsx";
import { H5 } from "../common/H5.tsx";
import { isUrl } from "../../util/isUrl.ts";
import { Hr } from "../common/Hr.tsx";
import ReactJsonView from "@microlink/react-json-view";
import { H6 } from "../common/H6.tsx";
import { useState } from "react";
import { Down } from "../common/icon/Down.tsx";
import { Next } from "../common/icon/Next.tsx";
import { get, isObject } from "lodash";
import { useConfig } from "../ConfigProvider.tsx";
import { Remove } from "../common/icon/Remove.tsx";
import { useDelete } from "../../client/query/useDelete.tsx";
import { toAnnotationGroups } from "../../util/toAnnotationGroups.ts";
import { useContainerAnnotation } from "../../client/endpoint/useContainerAnnotation.tsx";
import { StatusMessage } from "../common/StatusMessage.tsx";
import { hashIncludes } from "../../client/query/useGet.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { Checkbox } from "../common/Checkbox.tsx";
import { useStore } from "../../store/useStore.ts";
import { orThrow } from "../../util/orThrow.ts";
import { Badge } from "./Badge.tsx";

type PathValue = { path: string; value: string };

export function AnnotationCard(props: { id: string; canSelect?: boolean }) {
  const queryClient = useQueryClient();
  const annotationPreview = useConfig().annotationPreview;

  const { id, canSelect } = props;

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

  return (
    <Card
      className="bg-anrep-blue-50 text-anrep-blue-800"
      header={
        <div className="flex justify-between items-center border-b border-anrep-blue-100">
          <H5>
            {name}
            <Pipe />
            {annotation.type}
          </H5>
          <div className="p-4">
            <img src="/images/icon-annotation.png" className="h-4 w-4" alt="" />
          </div>
        </div>
      }
      footer={
        <>
          <A href={annotation.id}>
            Source <External className="ml-1" />
          </A>
          {isUrl(annotation.target) && (
            <>
              <Pipe />
              <A href={annotation.target as string}>
                <span title={annotation.target as string}>
                  Target <External className="ml-1" />
                </span>
              </A>
            </>
          )}
        </>
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
                typeof p.value === "object" ? JSON.stringify(p.value) : p.value
              }
            />
          ))}
      </div>
      <Hr size="sm" />
      <H6
        className="cursor-pointer select-none"
        onClick={() => setBodyOpen((prev) => !prev)}
      >
        Body {isBodyOpen ? <Down /> : <Next />}
      </H6>
      {isBodyOpen && <ReactJsonView src={annotation.body} name={null} />}
      <Hr size="sm" />
      <H6
        className="cursor-pointer select-none"
        onClick={() => setTargetOpen((prev) => !prev)}
      >
        Target {isTargetOpen ? <Down /> : <Next />}
      </H6>
      {isTargetOpen && annotation.target && !isUrl(annotation.target) && (
        <ReactJsonView src={annotation.target as object} name={null} />
      )}
      <div>
        {canSelect && (
          <Checkbox
            isSelected={isSelected}
            onToggle={() => {
              const update = isSelected
                ? selectedAnnotationIds.filter((sa) => sa !== id)
                : [...selectedAnnotationIds, id];
              setSelectedAnnotationsState({
                selectedAnnotationIds: update,
              });
            }}
            className="hover:text-inherit hover:cursor-pointer text-sky-800"
          />
        )}
        <span
          onClick={handleDelete}
          className="hover:text-inherit hover:cursor-pointer text-sky-800"
        >
          <Remove />
        </span>
      </div>
    </Card>
  );
}
