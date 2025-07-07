export function filterSuggestions(
  suggestions: string[] | undefined,
  value?: string
) {
  if (!suggestions?.length) {
    return []
  }
  if(!value) {
    return suggestions;
  }
  return suggestions.filter(s => s.toString().toLowerCase().includes(value.toString().toLowerCase()));
}