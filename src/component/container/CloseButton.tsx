import { Close } from "../common/icon/Close.tsx";

export function CloseButton(props: { onClose: () => void }) {
  return (
    <div
      onClick={props.onClose}
      className="absolute top-2 right-2 cursor-pointer"
    >
      <Close />
    </div>
  );
}
