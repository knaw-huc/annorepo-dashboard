import {
  FieldQueryErrors,
  FieldQueryForm,
  FormParamValue
} from "../../component/common/search/QueryModel.ts";

export type FormToAdd = {
  form: FieldQueryForm,
  error: FieldQueryErrors,
  param: FormParamValue
}