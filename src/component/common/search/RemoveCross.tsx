import { Cross } from "../icon/Cross.tsx";

export function RemoveCross(props: { onClick: () => void }) {
  return (
    <div className="ml-2 p-2 cursor-pointer" onClick={props.onClick}>
      <Cross />
    </div>
  );
}
