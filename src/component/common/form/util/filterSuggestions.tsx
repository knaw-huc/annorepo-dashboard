import {SelectOption} from "../SelectOption.tsx";
import {isNumber, isString} from "lodash";

export function filterSuggestions<T>(
  suggestions: SelectOption<T>[] | undefined,
  inputValue: string
): SelectOption<T>[] {
  if (!suggestions?.length) {
    return []
  }
  if (!inputValue) {
    return suggestions;
  }
  const compareString = compareAsString(inputValue)
  const compareNumber = compareAsNumber(inputValue)
  const compareAny = compareAsAny(inputValue)
  return suggestions.filter(s => {
    if (isString(s)) {
      return compareString(s)
    } else if (isNumber(s)) {
      return compareNumber(s)
    } else {
      return compareAny(s)
    }
  });
}

export const compareAsNumber = (inputValue: string) => (s: number) => {
  return s.toString().startsWith(inputValue);
}

export const compareAsString = (inputValue: string) => (s: string) => {
  return s.toString().toLowerCase().includes(inputValue.toLowerCase());
}

export const compareAsAny = (inputValue: string) => (s: any) => {
  return JSON.stringify(s).toLowerCase().includes(inputValue);
}
