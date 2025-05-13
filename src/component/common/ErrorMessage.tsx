import {toErrorMessage} from "../../util/toErrorMessage.tsx";
import {Warning} from "./Warning.tsx";

export function ErrorMessage(props: {
  error: any
}) {
  if(!props.error) {
    return null;
  }
  return <Warning>{toErrorMessage(props.error)}</Warning>
}
