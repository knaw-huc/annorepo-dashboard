import { ErrorMessage } from "./ErrorMessage.tsx";
import { Loading } from "./Loading.tsx";
import { QR } from "../../client/query/QR.tsx";

export function StatusMessage(props: {
  requests: QR[];

  /**
   * The status of what?
   */
  name: string;
}) {
  const { requests, name } = props;
  if (requests.some((r) => r.isError)) {
    return <ErrorMessage error={requests.find((r) => r.error)!.error} />;
  }
  if (requests.some((r) => r.isPaused)) {
    return <ErrorMessage error="Paused request" />;
  }
  if (requests.some((r) => !r.data)) {
    return <Loading name={name} />;
  }
}
