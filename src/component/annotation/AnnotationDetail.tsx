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

  return <div>
    <Button onClick={props.onClose}>&lt; Back</Button>
    {/* Use grid to prevent overflow */}
    <div className="grid grid-cols-1">
      <AnnotationCard annotation={annotation}/>
    </div>
  </div>
}