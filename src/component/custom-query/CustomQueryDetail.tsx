import { H1 } from "../common/H1.tsx";
import { CustomQueryCallEditor } from "./CustomQueryCallEditor.tsx";
import {
  CustomQueryCallArgs,
  useCustomQuery,
  useCustomQueryCall,
} from "../../client/endpoint/useCustomQuery.tsx";
import { StatusMessage } from "../common/StatusMessage.tsx";
import { useEffect, useState } from "react";
import { toCustomQueryParameters } from "./util/toCustomQueryParameters.ts";
import { Button } from "../common/Button.tsx";
import { Next } from "../common/icon/Next.tsx";
import { AnnotationPage } from "../annotation/AnnotationPage.tsx";
import { toPageNo } from "../../util/toPageNo.ts";
import { Hint } from "../common/Hint.tsx";
import { Pipe } from "../common/Pipe.tsx";
import { hasErrors } from "../../store/query/util/error/hasErrors.ts";
import { useStore } from "../../store/useStore.ts";
import { ContainerDropdown } from "./ContainerDropdown.tsx";
import { A } from "../common/A.tsx";
import { External } from "../common/icon/External.tsx";
import { useConfig } from "../ConfigProvider.tsx";

export function CustomQueryDetail(props: {
  name: string;
  onClose: () => void;
}) {
  const { name: customQueryName } = props;
  const config = useConfig();
  const { subqueries, initWithTemplate } = useStore();

  const [containerName, setContainerName] = useState("");
  const [pageNo, setPageNo] = useState(0);

  const customQuery = useCustomQuery(customQueryName);

  const [submitted, setSubmitted] = useState<CustomQueryCallArgs>({
    queryName: customQueryName,
    containerName,
    parameters: {},
    pageNo,
  });
  const customQueryCall = useCustomQueryCall(submitted);

  useEffect(() => {
    if (customQuery.data) {
      const template = JSON.parse(customQuery.data.queryTemplate);
      const params = customQuery.data.parameters;
      initWithTemplate(template, params);
    }
  }, [customQuery.data]);

  function handleSearch() {
    if (!customQuery.data) {
      return;
    }
    if (!subqueries.length) {
      return;
    }
    const parameters = toCustomQueryParameters(subqueries);
    setSubmitted({
      queryName: customQueryName,
      containerName,
      parameters,
      pageNo,
    });
  }

  const handleChangePage = (update: string) => {
    setPageNo(toPageNo(update));
  };

  if (!customQuery.data) {
    return <StatusMessage requests={[customQuery]} />;
  }

  const createdBy = customQuery.data.createdBy;
  return (
    <>
      <H1>
        {customQueryName} <Hint>Custom query</Hint>
      </H1>
      <p className="text-sm mb-3">
        {customQuery.data.public ? "Public" : "Private"}
        <Pipe />
        <span>Label: {customQuery.data.label}</span>
        {createdBy && (
          <>
            <Pipe />
            <span>Creator: {createdBy}</span>
          </>
        )}
        <Pipe />
        <span>
          Created at {new Date(customQuery.data.created).toLocaleString()}
        </span>
        <Pipe />
        <A
          href={`${config.AR_HOST}/global/custom-query/${customQuery.data.name}`}
          className="font-bold"
        >
          Source&nbsp;
          <External className="ml-1" />
        </A>
      </p>
      <p className="mb-5">{customQuery.data.description}</p>
      <div className="mb-2">
        <ContainerDropdown
          selected={containerName}
          onSelect={setContainerName}
        />
        <Button
          onClick={handleSearch}
          className="pl-5"
          disabled={hasErrors(subqueries) || !containerName}
        >
          Search
          <Next className="ml-2" />
        </Button>
      </div>
      {customQueryCall.isError && (
        <StatusMessage requests={[customQueryCall]} />
      )}
      {containerName && <CustomQueryCallEditor containerName={containerName} />}
      <div className="max-w-[100vw] whitespace-pre-wrap">
        {customQueryCall.isSuccess && (
          <AnnotationPage
            pageNo={pageNo}
            page={customQueryCall.data}
            onChangePageNo={handleChangePage}
          />
        )}
      </div>
    </>
  );
}
