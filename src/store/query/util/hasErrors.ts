import {FieldQueryErrors} from "../../../component/common/search/QueryModel.ts";
import {hasError} from "./hasError.ts";

export function hasErrors(errors: FieldQueryErrors[]) {
  return errors.some(e => hasError(e));
}