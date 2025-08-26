import { Close } from "../common/icon/Close.tsx";

export function CloseButton(props: { onClick: () => void }) {
  return (
    <div
      onClick={props.onClick}
      className="absolute top-2 right-2 cursor-pointer"
    >
      <Close />
    </div>
  );
}
