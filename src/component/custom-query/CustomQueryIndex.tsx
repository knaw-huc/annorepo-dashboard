import { H1 } from "../common/H1.tsx";
import { StatusMessage } from "../common/StatusMessage.tsx";
import { DeprecatedButton } from "../common/DeprecatedButton.tsx";
import { Add } from "../common/icon/Add.tsx";
import { useGet } from "../../client/query/useGet.tsx";
import { ArCustomQueryResult } from "../../model/ArModel.ts";
import { CustomQueryCard } from "./CustomQueryCard.tsx";
import { QR } from "../../client/query/QR.tsx";

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
      <H1>Custom queries</H1>
      <DeprecatedButton
        onClick={props.onClickCreateCustomQuery}
        className="mt-2"
      >
        Add
        <Add className="ml-1" />
      </DeprecatedButton>
      <div className="grid grid-cols-3 gap-5">
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
