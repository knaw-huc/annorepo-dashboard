import {H1} from "../common/H1.tsx";
import {CustomQueryCallEditor} from "./CustomQueryCallEditor.tsx";
import {
  CustomQueryCallArgs,
  useCustomQuery,
  useCustomQueryCall
} from "../../client/endpoint/useCustomQuery.tsx";
import {StatusMessage} from "../common/StatusMessage.tsx";
import {useEffect, useState} from "react";
import {toCustomQueryParameters} from "./toCustomQueryParameters.ts";
import {ArMyContainers} from "../../client/ArModel.ts";
import {Button} from "../common/Button.tsx";
import {Next} from "../common/icon/Next.tsx";
import {Dropdown} from "../common/form/Dropdown.tsx";
import {QR, useGet} from "../../client/query/useGet.tsx";
import {getContainerNames} from "../../client/endpoint/getContainerNames.tsx";
import {AnnotationPage} from "../annotation/AnnotationPage.tsx";
import {toPageNo} from "../../util/toPageNo.ts";
import {Hint} from "../common/Hint.tsx";
import {Pipe} from "../common/Pipe.tsx";
import {hasErrors} from "../../store/query/util/hasErrors.ts";
import {useStore} from "../../store/useStore.ts";

export function CustomQueryDetail(props: {
  name: string
  onClose: () => void
}) {
  const {name: customQueryName} = props;

  const {forms, params, errors, initWithTemplate} = useStore()

  const [containerName, setContainerName] = useState('')
  const [pageNo, setPageNo] = useState(0)

  const myContainers = useGet('/my/containers') as QR<ArMyContainers>
  const containerNames = getContainerNames(myContainers.data)
  const customQuery = useCustomQuery(customQueryName)

  const [submitted, setSubmitted] = useState<CustomQueryCallArgs>(
    {queryName: customQueryName, containerName, parameters: {}, pageNo}
  )
  const customQueryCall = useCustomQueryCall(submitted)

  useEffect(() => {
    if (customQuery.data) {
      const template = JSON.parse(customQuery.data.queryTemplate);
      const params = customQuery.data.parameters
      initWithTemplate(template, params);
    }
  }, [customQuery.data]);

  function handleSearch() {
    if (!customQuery.data) {
      return;
    }
    if (!forms.length) {
      return;
    }
    const parameters = toCustomQueryParameters(
      forms,
      params
    );
    setSubmitted({queryName: customQueryName, containerName, parameters, pageNo})
  }

  const handleChangePage = (update: string) => {
    setPageNo(toPageNo(update))
  }

  if (!customQuery.data) {
    return <StatusMessage request={customQuery}/>
  }

  let createdBy = customQuery.data.createdBy;
  return <>
    <H1>{customQueryName} <Hint>Custom query</Hint></H1>
    <p className="text-sm mb-3">
      {customQuery.data.public ? 'Public' : 'Private'}
      <Pipe/>
      <span>Label: {customQuery.data.label}</span>
      {createdBy && <>
        <Pipe/>
        <span>Creator: {createdBy}</span>
      </>}
      <Pipe/>
      <span>Created at {new Date(customQuery.data.created).toLocaleString()}</span>
    </p>
    <p className="mb-5">
      {customQuery.data.description}
    </p>
    <CustomQueryCallEditor/>
    <div className="mb-5">
      <Dropdown
        placeholder="Select container"
        className="mr-3"
        selectedValue={containerName}
        options={containerNames.map(key => ({label: key, value: key}))}
        onSelect={option => setContainerName(option.value)}
      />
      <Button
        onClick={handleSearch}
        className="pl-5"
        disabled={hasErrors(errors) || !containerName}
      >
        Search<Next className="ml-2"/>
      </Button>
    </div>
    <div className="max-w-[100vw] whitespace-pre-wrap">
      {!!customQueryCall.data && <AnnotationPage
        pageNo={pageNo}
        page={customQueryCall.data}
        onChangePageNo={handleChangePage}
      />
      }
    </div>
  </>
}

