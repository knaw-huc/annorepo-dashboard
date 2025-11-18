import { ValueError } from "./ValueError.ts";
import { SubqueryError } from "./SubqueryError.ts";

export type QueryError = ValueError | SubqueryError;
