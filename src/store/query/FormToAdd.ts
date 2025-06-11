import {
  FieldQueryErrors,
  FieldQueryForm,
  ParamValue
} from "../../component/common/search/QueryModel.ts";

export type FormToAdd = {
  form: FieldQueryForm,
  error: FieldQueryErrors,
  param: ParamValue
}