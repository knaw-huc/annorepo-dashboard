import {ErrorMessage} from "./ErrorMessage.tsx";
import {Loading} from "./Loading.tsx";
import {QR} from "../../client/query/QR.tsx";

export function StatusMessage(props: {
  request?: QR
  requests?: QR[]
}) {
  const {request, requests} = props;
  if(request) {
    if (request.error) {
      return <ErrorMessage error={request.error}/>;
    }
    if (!request.data) {
      return <Loading/>;
    }
  }
  if(requests) {
    if (requests.some(r => r.error)) {
      return <ErrorMessage error={requests.find(r => r.error)!.error}/>;
    }
    if (requests.some(r => !r.data)) {
      return <Loading/>;
    }

  }
}