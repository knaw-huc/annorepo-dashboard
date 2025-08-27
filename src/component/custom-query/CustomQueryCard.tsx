import { PropsWithChildren } from "react";
import { Card } from "../common/Card.tsx";
import { Link } from "@tanstack/react-router";
import { H5 } from "../common/H5.tsx";
import { useGet } from "../../client/query/useGet.tsx";
import { StatusMessage } from "../common/StatusMessage.tsx";
import { ArCustomQueryResult } from "../../model/ArModel.ts";
import { QR } from "../../client/query/QR.tsx";

export function CustomQueryCard(
  props: PropsWithChildren<{
    customQueryName: string;
    onClick: () => void;
  }>,
) {
  const { customQueryName } = props;
  const customQuery = useGet("/global/custom-query/{customQueryName}", {
    params: { path: { customQueryName } },
  }) as QR<ArCustomQueryResult>;

  if (!customQuery.isSuccess) {
    return <StatusMessage name="custom query" requests={[customQuery]} />;
  }

  const createdDateTime = new Date(customQuery.data.created).toLocaleString();
  return (
    <Card
      header={
        <Link to="/custom-query/$customQueryName" params={{ customQueryName }}>
          <H5>{customQueryName}</H5>
        </Link>
      }
    >
      <div>
        <p className="mb-2">{customQuery.data.description}</p>
        <p className="text-sm">Label: {customQuery.data.label}</p>
        {customQuery.data.createdBy ? (
          <p className="text-sm">
            Created by {customQuery.data.createdBy} at {createdDateTime}
          </p>
        ) : (
          <p className="text-sm">Created at {createdDateTime} </p>
        )}
      </div>
    </Card>
  );
}
