import {H1} from "../common/H1.tsx";
import {CustomQueryEditor} from "./CustomQueryEditor.tsx";
import {useCustomQuery} from "../../client/endpoint/useCustomQuery.tsx";
import {StatusMessage} from "../common/StatusMessage.tsx";
import {toCustomQueryForm} from "../common/search/util/toCustomQueryForm.ts";
import {ErrorRecord} from "../common/form/util/ErrorRecord.ts";
import {ArCustomQueryForm} from "../../client/ArModel.ts";

export function CustomQueryDetail(props: {
  name: string
  onClose: () => void
}) {
  const {name, onClose} = props;
  const customQuery = useCustomQuery(name)

  if(!customQuery.data) {
    return <StatusMessage request={customQuery} />
  }
  return <>
    <H1>{name}</H1>
    <CustomQueryEditor
      form={toCustomQueryForm(customQuery.data)}
      errors={{} as ErrorRecord<ArCustomQueryForm>}
      onChange={(update) => console.log('TODO: update', update)}
      onError={(error) => console.log('TODO: error', error)}
      onEditQuery={() => console.log('TODO: onEditQuery')}
      onClose={onClose}
      isExistingQuery={true}
    />
  </>
}

