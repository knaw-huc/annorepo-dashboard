import { Bin } from "../icon/Bin.tsx";

export function RemoveBin(props: { onClick: () => void }) {
  return (
    <div className="ml-2 p-2 cursor-pointer" onClick={props.onClick}>
      <Bin />
    </div>
  );
}
