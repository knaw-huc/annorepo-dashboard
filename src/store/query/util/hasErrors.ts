import {hasError} from "./hasError.ts";
import {FieldSubQueryErrors} from "../../../model/query/ErrorRecord.ts";

export function hasErrors(errors: FieldSubQueryErrors[]) {
  return errors.some(e => hasError(e));
}