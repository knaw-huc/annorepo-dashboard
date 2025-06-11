import {isEmpty, values} from "lodash";
import {ErrorRecord} from "../../../component/common/search/QueryModel.ts";

export function hasError<T extends object>(form: ErrorRecord<T>) {
  return values(form).some(
    field => !isEmpty(field)
  );
}