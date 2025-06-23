import {PropsWithChildren} from "react";
import {Card} from "../common/Card.tsx";
import {Link} from "@tanstack/react-router";
import {H5} from "../common/H5.tsx";
import {QR, useGet} from "../../client/query/useGet.tsx";
import {StatusMessage} from "../common/StatusMessage.tsx";
import {ArCustomQueryResult} from "../../client/ArModel.ts";


export function CustomQueryCard(props: PropsWithChildren<{
  customQueryName: string
  onClick: () => void
}>) {
  const {customQueryName} = props;
  const customQueryRequest = useGet(
    '/global/custom-query/{customQueryName}',
    {params: {path: {customQueryName}}}
  ) as QR<ArCustomQueryResult>

  if (!customQueryRequest.isSuccess) {
    return <StatusMessage request={customQueryRequest}/>
  }

  const customQuery = customQueryRequest.data;
  const createdDateTime = new Date(customQuery.created).toLocaleString();
  return <Card
    header={
      <Link
        to="/custom-query/$customQueryName"
        params={{customQueryName}}
      ><H5>
        {customQueryName}
      </H5></Link>
    }
  >
    <div>
      <p className="mb-2">{customQuery.description}</p>
      <p className="text-sm">Label: {customQuery.label}</p>
      {customQuery.createdBy
        ? <p className="text-sm">Created by {customQuery.createdBy} at {createdDateTime} </p>
        : <p className="text-sm">Created at {createdDateTime} </p>}
    </div>
  </Card>
}