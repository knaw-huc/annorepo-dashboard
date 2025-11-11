import { PropsWithChildren } from "react";
import { Card } from "../common/Card.tsx";
import { useNavigate } from "@tanstack/react-router";
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
  const navigate = useNavigate();
  const { customQueryName } = props;
  const customQuery = useGet("/global/custom-query/{customQueryName}", {
    params: { path: { customQueryName } },
  }) as QR<ArCustomQueryResult>;

  if (!customQuery.isSuccess) {
    return <StatusMessage name="custom query" requests={[customQuery]} />;
  }

  const createdDateTime = new Date(customQuery.data.created).toLocaleString();
  return (
    <span
      onClick={() =>
        navigate({
          to: "/custom-query/$customQueryName",
          params: { customQueryName },
        })
      }
    >
      <Card
        className="bg-anrep-pink-50 text-anrep-pink-800 max-w-4xl cursor-pointer"
        header={
          <div className="flex justify-between border-b">
            <H5>{customQueryName}</H5>
            <div className="p-4">
              <img src="/images/icon-query.png" className="h-4 w-4" alt="" />
            </div>
          </div>
        }
      >
        <div className="flex gap-4">
          <div className="flex-1">
            <p className="">{customQuery.data.description}</p>

            <p className="pt-2">
              {customQuery.data.createdBy
                ? `Created by ${customQuery.data.createdBy} at ${createdDateTime}`
                : `Created at ${createdDateTime}`}
            </p>
          </div>
          <div className="flex-shrink-0">
            <p className="px-4 flex flex-col">
              <strong className="">Label</strong>
              {customQuery.data.label}
            </p>
          </div>
        </div>
      </Card>
    </span>
  );
}
