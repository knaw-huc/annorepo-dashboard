import {ErrorMessage} from "./ErrorMessage.tsx";
import {Loading} from "./Loading.tsx";
import {QR} from "../../client/query/QR.tsx";

export function StatusMessage(props: {
  requests: QR[]
}) {
  const {requests} = props;
  if (requests.some(r => r.isError)) {
    return <ErrorMessage error={requests.find(r => r.error)!.error}/>;
  }
  if (requests.some(r => r.isStale)) {
    return <ErrorMessage error="Stale request" />;
  }
  if (requests.some(r => r.isPaused)) {
    return <ErrorMessage error="Paused request" />;
  }
  if (requests.some(r => !r.data)) {
    return <Loading/>;
  }
}