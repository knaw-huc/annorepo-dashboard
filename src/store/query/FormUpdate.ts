import {
  FieldQueryErrors,
  FieldQueryForm,
  ParamValue
} from "../../component/common/search/QueryModel.ts";

export type FormUpdate = {
  formIndex: number,
  form?: FieldQueryForm,
  error?: FieldQueryErrors,
  param?: ParamValue
}
