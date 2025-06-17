import {
  FieldQueryErrors,
  FieldQueryForm,
  FormParamValue
} from "../../component/common/search/QueryModel.ts";

export type FormUpdate = {
  formIndex: number,
  form?: FieldQueryForm,
  error?: FieldQueryErrors,
  param?: FormParamValue
}
