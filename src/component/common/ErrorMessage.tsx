import { toErrorMessage } from "../../util/toErrorMessage.tsx";
import { Warning } from "./Warning.tsx";

export function ErrorMessage(props: { error?: unknown }) {
  const { error } = props;
  console.error(error);
  return <Warning>{toErrorMessage(error)}</Warning>;
}
