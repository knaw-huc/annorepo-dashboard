import {Card} from "../common/Card.tsx";
import {toName} from "../../util/toName.ts";
import {Pipe} from "../common/Pipe.tsx";
import {A} from "../common/A.tsx";
import {External} from "../common/icon/External.tsx";
import {H5} from "../common/H5.tsx";
import {isUrl} from "../../util/isUrl.ts";
import {Hr} from "../common/Hr.tsx";
import ReactJsonView from '@microlink/react-json-view'
import {H6} from "../common/H6.tsx";
import {useState} from "react";
import {Down} from "../common/icon/Down.tsx";
import {Next} from "../common/icon/Next.tsx";
import {get, isObject} from "lodash";
import {Badge} from "../common/Badge.tsx";
import {useConfig} from "../ConfigProvider.tsx";
import {Remove} from "../common/icon/Remove.tsx";
import {useDelete} from "../../client/query/useDelete.tsx";
import {parseAnnotationId} from "./parseAnnotationId.ts";
import {
  useContainerAnnotation
} from "../../client/endpoint/useContainerAnnotation.tsx";
import {StatusMessage} from "../common/StatusMessage.tsx";

type PathValue = { path: string, value: string };
type PathValues = { path: string, value: string[] };

export function AnnotationCard(props: {
  id: string
}) {
  const annotationPreview = useConfig().annotationPreview

  const {containerName, annotationName} = parseAnnotationId(props.id)
  const annotationRequest = useContainerAnnotation(containerName, annotationName)
  const annotation = annotationRequest.data?.annotation
  const ETag = annotationRequest.data?.ETag
  const [isBodyOpen, setBodyOpen] = useState(false);
  const [isTargetOpen, setTargetOpen] = useState(false);

  const deleteAnnotation = useDelete("/w3c/{containerName}/{annotationName}")

  function handleDelete() {
    if (!window.confirm("Delete annotation?")) {
      return;
    }
    deleteAnnotation.mutate({
      params: {
        path: {containerName, annotationName},
      },
      headers: {ETag}
    })
  }

  if (!annotation) {
    return <StatusMessage request={annotationRequest}/>
  }

  const name = toName(annotation.via || annotation.id);
  const previewProps = annotationPreview.paths
    .map(path => ({path, value: get(annotation, path)}))
  const bodies: PathValue[] = Array.isArray(annotation.body)
    ? annotation.body
    : [annotation.body];

  const bodyPreviewProps: PathValue[] = annotationPreview.body.paths
    .map(path => ({path, value: bodies.map(b => get(b, path))}))
    .reduce((accumulator: PathValue[], current: PathValues) => {
      accumulator.push(...current.value.map(v => ({
        path: current.path,
        value: v
      })))
      return accumulator
    }, [])

  return <Card
    header={<H5>
      {name}
      <Pipe/>
      {annotation.type}
      <span
        className="text-base float-right text-lg text-sky-800 hover:text-inherit hover:cursor-pointer"
        onClick={handleDelete}
      >
        <Remove/>
      </span>
    </H5>}
    footer={
      <>
        <A href={annotation.id}>Source <External className="ml-1"/></A>
        {isUrl(annotation.target) &&
          <>
            <Pipe/>
            <A href={annotation.target as string}>
            <span title={annotation.target as string}>
              Target <External className="ml-1"/>
            </span>
            </A>
          </>}
      </>}
  >
    <p className="-ml-1 mt-3">
      <>{previewProps
        .filter(p => p.value)
        .map((p, i) => <Badge className="mr-2" key={i}>
          {p.path.replace('.', ' ')}: &nbsp;
          <strong>{isObject(p.value) ? JSON.stringify(p.value) : p.value}</strong>
        </Badge>)
      }
        {bodyPreviewProps
          .filter(p => p.value)
          .map((p, i) => <Badge className="mr-2" key={i}>
            body {p.path.replace('.', ' ')}: &nbsp;
            <strong>{isObject(p.value) ? JSON.stringify(p.value) : p.value}</strong>
          </Badge>)
        }
      </>

    </p>
    <Hr size="sm"/>
    <H6
      className="cursor-pointer select-none"
      onClick={() => setBodyOpen(prev => !prev)}
    >
      Body {isBodyOpen ? <Down/> : <Next/>}
    </H6>
    {isBodyOpen && <ReactJsonView
      src={annotation.body}
      name={null}
    />}
    <Hr size="sm"/>
    <H6
      className="cursor-pointer select-none"
      onClick={() => setTargetOpen(prev => !prev)}
    >
      Target {isTargetOpen ? <Down/> : <Next/>}
    </H6>
    {isTargetOpen && annotation.target && !isUrl(annotation.target) &&
      <ReactJsonView
        src={annotation.target as object}
        name={null}
      />}
  </Card>
}