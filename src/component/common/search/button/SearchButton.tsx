import { Next } from "../../icon/Next.tsx";
import { NeutralButton } from "../../NeutralButton.tsx";

export function SearchButton(props: {
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <NeutralButton
      className=""
      disabled={props.disabled === true}
      onClick={props.onClick}
    >
      Search
      <Next className="ml-1" />
    </NeutralButton>
  );
}
