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
import { Badge } from "../common/Badge.tsx";
import { useConfig } from "../ConfigProvider.tsx";
import { Remove } from "../common/icon/Remove.tsx";
import { useDelete } from "../../client/query/useDelete.tsx";
import { toAnnotationGroups } from "../../util/toAnnotationGroups.ts";
import { useContainerAnnotation } from "../../client/endpoint/useContainerAnnotation.tsx";
import { StatusMessage } from "../common/StatusMessage.tsx";
import { queryKeyIncludes } from "../../client/query/useGet.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { Checkbox } from "../common/Checkbox.tsx";
import { useStore } from "../../store/useStore.ts";
import { orThrow } from "../../util/orThrow.ts";

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
            predicate: (query) => queryKeyIncludes(query, "containerName"),
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
      header={
        <div className="flex items-start justify-between">
          <H5>
            {name}
            <Pipe />
            {annotation.type}
          </H5>
          <div className="mt-2 flex items-center gap-x-3">
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
      <p className="-ml-1 mt-3">
        <>
          {previewProps
            .filter((p) => p.value)
            .map((p, i) => (
              <Badge className="mr-2" key={i}>
                {p.path.replace(".", " ")}: &nbsp;
                <strong>
                  {isObject(p.value) ? JSON.stringify(p.value) : p.value}
                </strong>
              </Badge>
            ))}
          {bodyPreviewProps
            .filter((p) => p.value)
            .map((p, i) => (
              <Badge className="mr-2" key={i}>
                body {p.path.replace(".", " ")}: &nbsp;
                <strong>
                  {isObject(p.value) ? JSON.stringify(p.value) : p.value}
                </strong>
              </Badge>
            ))}
        </>
      </p>
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
    </Card>
  );
}
