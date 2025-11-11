import { AnnotationCard } from "./AnnotationCard.tsx";
import { useContainerRole } from "../container/useContainerRole.tsx";

export function AnnotationDetail(props: {
  id: string;
  onClose: () => void;
  containerName: string;
}) {
  const { id, containerName } = props;
  const role = useContainerRole({ idOrName: containerName });
  return (
    <div>
      {/* Use grid to prevent overflow */}
      <div className="grid grid-cols-1">
        <AnnotationCard id={id} role={role} />
      </div>
    </div>
  );
}
