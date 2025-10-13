import { PropsWithChildren } from "react";
import { CloseButton } from "./container/CloseButton.tsx";

export function Modal(
  props: PropsWithChildren<{
    onClose: () => void;
  }>,
) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ background: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="relative bg-white rounded-lg p-6 max-w mx-4">
        <CloseButton onClick={props.onClose} />
        <div className="mt-2">{props.children}</div>
      </div>
    </div>
  );
}
