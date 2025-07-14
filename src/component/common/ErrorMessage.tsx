import {toErrorMessage} from "../../util/toErrorMessage.tsx";
import {Warning} from "./Warning.tsx";

export function ErrorMessage(props: {
  error?: any
}) {
  const {error} = props;
  console.warn('IS IT SHOWING?', error)
  return <Warning>{toErrorMessage(error)}</Warning>
}
