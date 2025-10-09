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
import { DeprecatedButton } from "../common/DeprecatedButton.tsx";
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
import { Remove } from "../common/icon/Remove.tsx";
import { isOidcUser } from "../../model/user/User.ts";
import { keyEquals } from "../../client/query/useGet.tsx";
import { useDelete } from "../../client/query/useDelete.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { Warning } from "../common/Warning.tsx";

export function CustomQueryDetail(props: {
  name: string;
  onClose: () => void;
}) {
  const { name: customQueryName } = props;
  const [containerName, setContainerName] = useState("");
  const [pageNo, setPageNo] = useState(0);

  const { selectedHost, subqueries, initWithTemplate, user } = useStore();
  const customQuery = useCustomQuery(customQueryName);
  const queryClient = useQueryClient();
  const [error, setError] = useState<string>();
  const [submitted, setSubmitted] = useState<CustomQueryCallArgs>({
    queryName: customQueryName,
    containerName,
    parameters: {},
    pageNo,
  });
  const customQueryCall = useCustomQueryCall(submitted);
  const removeCustomQuery = useDelete("/global/custom-query/{customQueryName}");

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

  const handleRemove = () => {
    if (!window.confirm("Delete custom query?")) {
      return;
    }
    if (!customQuery.data) {
      return;
    }
    removeCustomQuery.mutate(
      {
        params: {
          path: { customQueryName },
        },
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            predicate: (query) => keyEquals(query, "/global/custom-query"),
          });
          props.onClose();
        },
        onError: (e) => setError(`Could not remove container: ${e.message}`),
      },
    );
  };

  const handleChangePage = (update: string) => {
    setPageNo(toPageNo(update));
  };

  const canDelete =
    isOidcUser(user) && user.email === customQuery.data?.createdBy;

  if (!customQuery.data) {
    return <StatusMessage name="custom query" requests={[customQuery]} />;
  }

  const createdBy = customQuery.data.createdBy;
  return (
    <>
      <H1>
        {customQueryName} <Hint>Custom query</Hint>
      </H1>
      {canDelete && (
        <DeprecatedButton onClick={handleRemove} className="mr-2">
          Delete
          <Remove className="ml-1" />
        </DeprecatedButton>
      )}
      {error && <Warning onClose={() => setError("")}>{error}</Warning>}
      <p className="text-sm mt-5 mb-3">
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
          href={`${selectedHost}/global/custom-query/${customQuery.data.name}`}
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
        <DeprecatedButton
          onClick={handleSearch}
          className="pl-5"
          disabled={hasErrors(subqueries) || !containerName}
        >
          Search
          <Next className="ml-2" />
        </DeprecatedButton>
      </div>
      {customQueryCall.isError && (
        <StatusMessage name="custom query call" requests={[customQueryCall]} />
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
