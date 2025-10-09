import { Next } from "../../icon/Next.tsx";
import { DeprecatedButton } from "../../DeprecatedButton.tsx";

export function SearchButton(props: {
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <DeprecatedButton
      disabled={props.disabled === true}
      type="button"
      className="h-full border-b-2"
      onClick={props.onClick}
    >
      Search
      <Next className="ml-1" />
    </DeprecatedButton>
  );
}
