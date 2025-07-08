import {AnnotationCard} from "./AnnotationCard.tsx";

export function AnnotationDetail(props: {
  id: string
  onClose: () => void
}) {

  return <div>
    {/* Use grid to prevent overflow */}
    <div className="grid grid-cols-1">
      <AnnotationCard
        id={props.id}
      />
    </div>
  </div>
}