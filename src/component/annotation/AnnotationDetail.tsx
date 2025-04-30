import {AnnotationCard} from "./AnnotationCard.tsx";
import {
  useContainerAnnotation
} from "../../client/endpoint/useContainerAnnotation.tsx";
import {Loading} from "../common/Loading.tsx";
import {Button} from "../common/Button.tsx";

export function AnnotationDetail(props: {
  containerName: string
  annotationName: string
  onClose: () => void
}) {
  const {containerName, annotationName} = props;
  const {data: annotation} = useContainerAnnotation(containerName, annotationName)
  if (!annotation) {
    return <Loading/>
  }

  return <>
    <Button onClick={props.onClose}>&lt; Back</Button>
    <AnnotationCard annotation={annotation}/>
  </>
}