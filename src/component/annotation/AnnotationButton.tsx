import { PropsWithChildren } from "react";
import { Button } from "../common/Button.tsx";

export function AnnotationButton(
  props: PropsWithChildren<{
    onClick: () => void;
    className?: string;
  }>,
) {
  return (
    <Button
      onClick={props.onClick}
      className="bg-anrep-blue-100 border-anrep-blue-200 hover:bg-anrep-blue-50 hover:border-anrep-blue-400 text-anrep-blue-800"
    >
      {props.children}
    </Button>
  );
}
