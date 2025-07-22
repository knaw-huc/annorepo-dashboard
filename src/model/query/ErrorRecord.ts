import {ComparisonSubQueryForm} from "./QueryModel.ts";

export type ErrorRecord<T extends object> = Record<keyof T, string>
export type ErroneousValue = string
export type FieldSubQueryErrors = ErrorRecord<ComparisonSubQueryForm>;