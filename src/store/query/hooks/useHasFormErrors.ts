import {hasError} from "../util/hasError.ts";
import {useStore} from "../../useStore.ts";

export const useHasFormErrors = (formIndex: number) => useStore(d => hasError(d.errors[formIndex]))