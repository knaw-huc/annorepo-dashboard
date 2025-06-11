import {useStore} from "../../useStore.ts";
import {hasErrors} from "../util/hasErrors.ts";

export const useHasErrors = useStore(s => hasErrors(s.errors))

