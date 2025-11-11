import { H1 } from "../common/H1.tsx";
import { StatusMessage } from "../common/StatusMessage.tsx";
import { useGet } from "../../client/query/useGet.tsx";
import { ArCustomQueryResult } from "../../model/ArModel.ts";
import { CustomQueryCard } from "./CustomQueryCard.tsx";
import { QR } from "../../client/query/QR.tsx";

import { NeutralButton } from "../common/NeutralButton.tsx";

export function CustomQueryIndex(props: {
  onClickCreateCustomQuery: () => void;
  onClickOpenCustomQuery: (queryName: string) => void;
}) {
  const customQueries: QR<ArCustomQueryResult[]> = useGet(
    "/global/custom-query",
  );

  if (!customQueries.isSuccess) {
    return <StatusMessage name="custom queries" requests={[customQueries]} />;
  }

  return (
    <div>
      <div className="flex justify-between w-full my-8">
        <H1>Custom queries</H1>
        <NeutralButton onClick={props.onClickCreateCustomQuery}>
          New query
        </NeutralButton>
      </div>
      <div className="gap-8 flex flex-col">
        {customQueries.data.map((query, i) => (
          <CustomQueryCard
            key={i}
            customQueryName={query.name}
            onClick={() => props.onClickOpenCustomQuery(query.name)}
          />
        ))}
      </div>
    </div>
  );
}
