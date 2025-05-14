import {isRangeQueryOperator, QueryOperator} from "../../client/ArModel.ts";
import {useEffect} from "react";
import {SearchWithSuggestions} from "../common/form/SearchWithSuggestions.tsx";

export function QueryFieldInput(props: {
  value: string
  operator: QueryOperator
  suggestions: string[],
  onChange: (value: string) => void
}) {
  const {value, operator, suggestions, onChange} = props;

  useEffect(() => {
    if (value && isRangeQueryOperator(operator)) {
      onChange('')
    }
  }, [operator, onChange]);

  return <SearchWithSuggestions
    label="Field"
    disabled={isRangeQueryOperator(operator)}
    value={isRangeQueryOperator(operator) ? 'n.a.' : value}
    suggestions={suggestions}
    onChange={onChange}
  />
}
