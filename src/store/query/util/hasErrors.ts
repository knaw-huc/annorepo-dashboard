import {hasError} from "./hasError.ts";

import {ComparisonSubQueryErrors} from "../../../model/query/QueryModel.ts";

export function hasErrors(errors: ComparisonSubQueryErrors[]) {
  return errors.some(e => hasError(e));
}